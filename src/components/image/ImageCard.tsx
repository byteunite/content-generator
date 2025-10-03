import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ImageCardProps {
  src: string
  alt?: string
  title?: string
}

export function ImageCard({ src, alt = "", title }: ImageCardProps) {
  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full bg-muted">
          <img
            src={src}
            alt={alt}
            className={cn(
              "object-cover w-full h-full",
            )}
          />
        </div>
        {title && (
          <CardTitle className="p-3 text-sm font-medium truncate">{title}</CardTitle>
        )}
      </CardContent>
    </Card>
  )
}

export default ImageCard
