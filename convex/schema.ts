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
  topic: v.string(), // The topic for the prompt generation
  prompt: v.string(), // The final prompt with placeholders replaced
  status: v.union(v.literal('generating_prompt'), v.literal('prompt_generated'), v.literal('generating_image'), v.literal('image_generated'), v.literal('failed')),
  storageId: v.optional(v.id('_storage')), // The generated image file in storage
}).index("byTemplateId", ["templateId"])

export default defineSchema({ templates, outputs })