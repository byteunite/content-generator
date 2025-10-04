import type { FunctionReturnType } from 'convex/server'
import { api } from 'convex/_generated/api'

export type Template = FunctionReturnType<typeof api.template.list>[number]