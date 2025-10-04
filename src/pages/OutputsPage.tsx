import { OutputGrid } from "@/components/output/OutputGrid"

export function OutputsPage() {
  return (
    <div className="min-h-screen p-6 pb-32">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Generated Outputs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all your AI-generated content and images
        </p>
      </header>

      <main>
        <OutputGrid />
      </main>
    </div>
  )
}
