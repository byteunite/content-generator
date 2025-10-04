import type { FunctionReturnType } from 'convex/server'
import { api } from 'convex/_generated/api'

export type Output = FunctionReturnType<typeof api.outputs.list>[number]
