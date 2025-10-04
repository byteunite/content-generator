import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { OutputCard } from "./OutputCard"
import { Loader2 } from "lucide-react"

export function OutputGrid() {
  const outputs = useQuery(api.outputs.list)

  if (outputs === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (outputs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">🎨</div>
        <h3 className="text-lg font-semibold mb-2">No outputs yet</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Generate your first output by selecting a template and entering a topic.
        </p>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {outputs.map((output) => (
        <OutputCard key={output._id} output={output} />
      ))}
    </div>
  )
}
