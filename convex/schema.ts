import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const templates = defineTable({
  title: v.string(),
})

export default defineSchema({ templates })