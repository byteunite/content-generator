import { TemplateGrid } from "@/components/template/TemplateGrid"
import UploadTemplate from "@/components/template/UploadTemplate"

export function TemplatesPage() {
  return (
    <div className="min-h-screen p-6 pb-32">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            A gallery of templates where you can upload and use the template to generate content
          </p>
        </div>
        <div>
          <UploadTemplate />
        </div>
      </header>

      <main>
        <TemplateGrid />
      </main>
    </div>
  )
}
