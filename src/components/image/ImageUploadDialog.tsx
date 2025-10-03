import { useCallback, useRef, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "../ui/dialog"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

type FilePreview = {
  file: File
  url: string
}

export default function ImageUploadDialog() {
  const [preview, setPreview] = useState<FilePreview | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const addFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return
    const f = files[0]
    // revoke previous
    if (preview) URL.revokeObjectURL(preview.url)
    setPreview({ file: f, url: URL.createObjectURL(f) })
  }, [preview])

  const clear = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview.url)
    setPreview(null)
  }, [preview])

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    addFile(e.target.files)
  }, [addFile])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload image</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
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
              Close
            </Button>
          </DialogClose>

          <Button disabled={!preview}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

