import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Template } from "@/types/template"

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full bg-muted">
          <img
            src={template.imageUrl}
            alt={template.title}
            className={cn(
              "object-cover w-full h-full",
            )}
          />
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            {template.status}
          </span>
        </div>
        <CardTitle className="p-3 text-sm font-medium truncate">{template.title}</CardTitle>
        <CardDescription className="px-3 pb-3 text-xs text-muted-foreground">{template.prompt}</CardDescription>
      </CardContent>
    </Card>
  )
}