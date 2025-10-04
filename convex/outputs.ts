import { v } from 'convex/values'
import { query } from './_generated/server'

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
