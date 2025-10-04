import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const templates = defineTable({
  storageId: v.id('_storage'),
  title: v.string(),
  prompt: v.string(),
  status: v.union(v.literal('processing'), v.literal('completed'), v.literal('failed')),
}).index("byStorageId", ["storageId"])

export const outputs = defineTable({
  templateId: v.id('templates'),
  storageId: v.optional(v.id('_storage')),
  prompt: v.string(),
  status: v.union(v.literal('generating_prompt'), v.literal('prompt_generated'), v.literal('generating_image'), v.literal('image_generated'), v.literal('failed')),
}).index("byTemplateId", ["templateId"])

export default defineSchema({ templates, outputs })