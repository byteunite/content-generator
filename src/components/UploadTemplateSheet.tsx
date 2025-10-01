import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const UploadTemplateSheet: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPreview(url || null)
    setFile(null) // Clear file if URL is entered
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      setIsSubmitting(true)
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Handle upload logic here, e.g., send to server
      console.log("Uploading:", { file })
      // Reset form
      setFile(null)
      setPreview(null)
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add New Template</Button>
      </SheetTrigger>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SheetContent>

          <SheetHeader>
            <SheetTitle>Add New Template</SheetTitle>
            <SheetDescription>
              Enter an image URL or upload a file to create a new template.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 px-4">
            <div className="space-y-2">
              <Label htmlFor="file">Upload Image</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                Select an image file from your device.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-2 bg-muted/50 h-96 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="max-w-full max-h-96 object-contain rounded" />
                ) : (
                  <p className="text-sm text-muted-foreground">No image selected</p>
                )}
              </div>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={!file || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>

        </SheetContent>
      </form>
    </Sheet>
  )
}

export default UploadTemplateSheet