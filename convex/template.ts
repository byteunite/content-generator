import { v } from 'convex/values'
import { asyncMap } from 'convex-helpers'
import { internalMutation, mutation, query } from './_generated/server'
import { internal } from './_generated/api'

export const create = mutation({
  args: v.object({ storageId: v.id("_storage") }),
  handler: async (ctx, { storageId }) => {
    await ctx.db.insert("templates", {
      storageId,
      status: "processing",
      title: "",
      prompt: "",
    })

    await ctx.scheduler.runAfter(0, internal.ai.analyzeImage, { storageId })
  }
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    const templates = await asyncMap(
      await ctx.db.query("templates").collect(),
      async (template) => {
        const url = await ctx.storage.getUrl(template.storageId)
        return { ...template, imageUrl: url! }
      }
    );

    return templates
  }
})

export const updateResult = internalMutation({
  args: {
    storageId: v.id("_storage"),
    result: v.union(
      v.object({
        status: v.literal("completed"),
        title: v.string(),
        prompt: v.string(),
      }),
      v.object({ status: v.literal("failed") })
    )
  },
  handler: async (ctx, { storageId, result }) => {
    const template = await ctx.db
      .query("templates")
      .withIndex("byStorageId", (q) => q.eq("storageId", storageId))
      .first()

    if (!template) {
      throw new Error("Template not found")
    }

    await ctx.db.patch(template._id, result)
  }
})