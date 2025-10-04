import { useQuery } from "convex/react"
import { TemplateCard } from "../template/TemplateCard"
import { api } from 'convex/_generated/api'

export function ImageGrid() {
  const templates = useQuery(api.template.list)

  if (!templates) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
      {templates.map((template, idx) => (
        <TemplateCard key={idx} template={template} />
      ))}
    </div>
  )
}

export default ImageGrid
