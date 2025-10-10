import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Output } from "@/types/output"
import { Clock, FileText, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface OutputCardProps {
  output: Output
}

export function OutputCard({ output }: OutputCardProps) {
  const [isPromptExpanded, setIsPromptExpanded] = useState(false)

  const statusVariant =
    output.status === 'failed'
      ? 'destructive'
      : output.status === 'image_generated'
        ? 'success'
        : 'warning'

  const statusLabel = {
    'generating_prompt': 'Generating Prompt',
    'prompt_generated': 'Prompt Generated',
    'generating_image': 'Generating Image',
    'image_generated': 'Completed',
    'failed': 'Failed',
  }[output.status]

  let imageUrl = 'https://placehold.co/400x600?text=No+Image'
  if (output.imageUrl) {
    imageUrl = output.imageUrl
  } else if (output.template && output.template.imageUrl) {
    imageUrl = output.template.imageUrl
  }


  return (
    <Card className="group flex flex-col p-0 overflow-hidden break-inside-avoid mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Template Image Preview */}

        <div className="relative w-full bg-muted">
          <img
            src={imageUrl}
            className="object-contain w-full h-full"
          />
          {output.status !== 'image_generated' && (
            <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
              Template
            </Badge>
          )}
          <Badge variant={statusVariant} className="absolute top-2 right-2 text-xs">
            {statusLabel}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Topic as Title */}
          <div className="flex items-start gap-3">
            <FileText className="size-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
                {output.topic}
              </CardTitle>
            </div>
          </div>

          {/* Generated Prompt */}
          {output.prompt && (
            <Collapsible open={isPromptExpanded} onOpenChange={setIsPromptExpanded}>
              <CollapsibleTrigger asChild>
                <div className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 -m-1 p-1 rounded transition-colors">
                  <Sparkles className="size-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0 flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {!isPromptExpanded && (
                        <CardDescription className="text-xs leading-relaxed line-clamp-2">
                          {output.prompt}
                        </CardDescription>
                      )}
                    </div>
                    {isPromptExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-7">
                  <CardDescription className="text-xs leading-relaxed">
                    {output.prompt}
                  </CardDescription>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Template Source */}
          {output.template && (
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Clock className="size-3 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">
                From: {output.template.title}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
