import { useRef, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import { toast } from "sonner"

type FilePreview = {
  file: File
  url: string
}

export default function ImageUploadDialog() {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<FilePreview | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl)
  const createTemplate = useMutation(api.template.create)

  const addFile = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const f = files[0]
    // revoke previous
    if (preview) URL.revokeObjectURL(preview.url)
    setPreview({ file: f, url: URL.createObjectURL(f) })
  }

  const clear = () => {
    if (preview) URL.revokeObjectURL(preview.url)
    setPreview(null)
    setOpen(false)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFile(e.target.files)
  }

  const onSubmit = async () => {
    if (!preview) return

    // Get the upload URL
    const uploadUrl = await generateUploadUrl()

    // Upload the file to the URL
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": preview.file.type },
      body: preview.file,
    });
    const { storageId } = await result.json();
    
    // Create a new template record in the database
    await createTemplate({ storageId })

    toast.success("Template uploaded successfully!")
    clear()
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Upload Template</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Template</DialogTitle>
        </DialogHeader>

        <Card className="p-0 border">
          <div className="relative flex min-h-96 w-full items-center justify-center">
            {preview ? (
              <>
                <img
                  src={preview.url}
                  alt={preview.file.name}
                  className="absolute inset-0 h-full w-full object-contain"
                />
                <div className="absolute top-4 right-4">
                  <Button variant="outline" onClick={() => inputRef.current?.click()}>
                    Change image
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
                <p className="text-sm text-muted-foreground">
                  Select an image to upload
                </p>
                <Button variant="outline" onClick={() => inputRef.current?.click()}>
                  Select file
                </Button>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </div>
        </Card>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => clear()}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={onSubmit} disabled={!preview}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

