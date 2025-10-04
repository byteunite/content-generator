import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Template } from "@/types/template"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"

interface UseTemplateProps {
  template: Template
  /** Optional trigger element; if omitted a default button is rendered */
  trigger?: React.ReactNode
}

export function UseTemplate({ template, trigger }: UseTemplateProps) {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState("")
  const createOutput = useMutation(api.output.create)

  async function handleGenerate() {
    await createOutput({
      templateId: template._id,
      topic
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button size="sm" variant="secondary">Use template</Button>}
      </DialogTrigger>

      <DialogContent className="overflow-y-auto w-full h-screen rounded-none max-w-screen sm:h-auto sm:rounded-lg sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Generate content from template</DialogTitle>
          <DialogDescription>
            Use the fields below to generate content with the selected template.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="gap-4">
            <label className="text-sm font-medium mb-1 block">Topic</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Short topic or title"
              className="text-sm"
            />
          </div>

          <div className="grid gap-3">
            {/* Helicopter view summary: prominent template summary */}
            <div className="flex gap-4 items-start rounded-md border bg-muted p-4">
              <img src={template.imageUrl} alt={template.title} className="w-1/3 h-full object-contain object-top flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold truncate">{template.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{template.prompt}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleGenerate}>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UseTemplate
