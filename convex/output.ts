import { v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'
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

    const baseImageUrl = await ctx.storage.getUrl(template.storageId)
    if (!baseImageUrl) {
      throw new Error("Base image not found in storage")
    }

    await ctx.scheduler.runAfter(0, internal.ai.generatePrompt, {
      basePrompt: template.prompt,
      baseImageUrl,
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
        storageId: v.id("_storage"),
        status: v.literal('image_generated'),
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

    if (result.status === 'prompt_generated') {
      // If the prompt is generated, we can proceed to generate the image
      const template = await ctx.db.get(output.templateId)
      if (!template) {
        throw new Error("Template not found")
      }

      // Get the base image URL from storage
      const baseImageUrl = await ctx.storage.getUrl(template.storageId)
      if (!baseImageUrl) {
        throw new Error("Base image not found in storage")
      }

      // Update the output status to 'generating_image' before starting image generation
      await ctx.db.patch(outputId, { status: 'generating_image', })

      // Schedule the image generation task
      await ctx.scheduler.runAfter(0, internal.ai.generateImage, {
        prompt: result.prompt,
        baseImageUrl: baseImageUrl,
        outputId: outputId,
      })
    }

    await ctx.db.patch(outputId, result)
  }
})


export const list = query({
  args: {},
  handler: async (ctx) => {
    const outputs = await ctx.db
      .query('outputs')
      .order('desc')
      .collect()

    const outputsWithDetails = await Promise.all(
      outputs.map(async (output) => {
        const template = await ctx.db.get(output.templateId)

        let imageUrl = null

        if (output.storageId) {
          imageUrl = await ctx.storage.getUrl(output.storageId)
        }

        let templateImageUrl = null
        if (template?.storageId) {
          templateImageUrl = await ctx.storage.getUrl(template.storageId)
        }

        return {
          ...output,
          imageUrl,
          template: template
            ? {
              ...template,
              imageUrl: templateImageUrl,
            }
            : null,
        }
      })
    )

    return outputsWithDetails
  },
})

export const getById = query({
  args: { id: v.id('outputs') },
  handler: async (ctx, { id }) => {
    const output = await ctx.db.get(id)
    if (!output) {
      return null
    }

    const template = await ctx.db.get(output.templateId)
    let imageUrl = null

    if (output.storageId) {
      imageUrl = await ctx.storage.getUrl(output.storageId)
    }

    let templateImageUrl = null
    if (template?.storageId) {
      templateImageUrl = await ctx.storage.getUrl(template.storageId)
    }

    return {
      ...output,
      imageUrl,
      template: template
        ? {
          ...template,
          imageUrl: templateImageUrl,
        }
        : null,
    }
  },
})
