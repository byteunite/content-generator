import { v } from 'convex/values'
import { internalMutation, mutation } from './_generated/server'
import { internal } from './_generated/api'

export const create = mutation({
  args: {
    templateId: v.id('templates'),
    topic: v.string(),
  },
  handler: async (ctx, { templateId, topic }) => {
    const template = await ctx.db.get(templateId)
    if (!template) {
      throw new Error('Template not found')
    }
    const outputId = await ctx.db.insert('outputs', {
      topic,
      prompt: "",
      templateId,
      status: 'generating_prompt',
    })

    await ctx.scheduler.runAfter(0, internal.ai.generatePrompt, {
      basePrompt: template.prompt,
      topic,
      outputId,
    })

    return outputId
  },

})

export const updateResult = internalMutation({
  args: {
    outputId: v.id("outputs"),
    result: v.union(
      v.object({
        prompt: v.string(),
        status: v.literal('prompt_generated'),
      }),
      v.object({
        status: v.literal('failed')
      })
    )
  },
  handler: async (ctx, { outputId, result }) => {
    const output = await ctx.db.get(outputId)
    if (!output) {
      throw new Error("Output not found")
    }

    await ctx.db.patch(outputId, result)
  }
})