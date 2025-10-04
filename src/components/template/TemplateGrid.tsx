import { useQuery } from "convex/react"
import { TemplateCard } from "./TemplateCard"
import { api } from 'convex/_generated/api'

export function TemplateGrid() {
  const templates = useQuery(api.template.list)

  console.log(templates);
  

  if (!templates) {
    return <div>Loading...</div>
  }

  if (templates.length === 0) {
    return <div>No templates found.</div>
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {templates.map((template, idx) => (
        <TemplateCard key={idx} template={template} />
      ))}
    </div>
  )
}

export default TemplateGrid
