import { useState } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Template } from "@/types/template"

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusVariant = template.status === 'failed' ? 'destructive' : template.status === 'processing' ? 'warning' : 'success'

  return (
    <Card className="flex flex-col p-0 overflow-hidden break-inside-avoid mb-4">
      <CardContent className="p-0">
        <div className="relative w-full bg-muted">
          <img
            src={template.imageUrl}
            alt={template.title}
            className={cn(
              "object-cover w-full h-full",
            )}
          />
          <Badge variant={statusVariant} className="absolute top-2 right-2">
            {template.status}
          </Badge>
        </div>
        {
          template.status === 'completed' && (
            <>
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger asChild>
                  <CardTitle className="p-3 text-sm font-medium flex items-center justify-between">
                    {template.title}
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </CardTitle>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardDescription className="px-3 pb-3 text-xs text-muted-foreground">
                    {template.prompt}
                  </CardDescription>
                </CollapsibleContent>
              </Collapsible>
            </>
          )
        }
      </CardContent>
    </Card>
  )
}