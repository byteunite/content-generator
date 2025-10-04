import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const templates = defineTable({
  storageId: v.id('_storage'),
  title: v.string(),
  prompt: v.string(),
  status: v.union(v.literal('processing'), v.literal('completed'), v.literal('failed')),
}).index("byStorageId", ["storageId"])

export default defineSchema({ templates })