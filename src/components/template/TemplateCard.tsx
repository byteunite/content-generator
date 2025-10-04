import UseTemplate from "@/components/template/UseTemplate"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    <Card className="group flex flex-col p-0 overflow-hidden break-inside-avoid mb-4">
      <CardContent className="p-0">
        <div className="relative w-full bg-muted">
          <img
            src={template.imageUrl}
            alt={template.title}
            className="object-cover w-full h-full"
          />
          <Badge variant={statusVariant} className="absolute top-2 right-2">
            {template.status}
          </Badge>
          {/* Hover-only button overlay (appears when card is hovered) */}
          {template.status === 'completed' && (
            <div className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none">
              <UseTemplate
                template={template}
                trigger={
                  <Button
                    size="sm"
                    variant="secondary"
                    className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-auto"
                  >
                    Use template
                  </Button>
                }
              />
            </div>
          )}
        </div>

        {template.status === 'completed' && (
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
        )}
      </CardContent>
    </Card>
  )
}