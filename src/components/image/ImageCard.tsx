import Card from "../ui/card"
import { cn } from "../../lib/utils"

interface ImageCardProps {
  src: string
  alt?: string
  title?: string
}

export function ImageCard({ src, alt = "", title }: ImageCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
          src={src}
          alt={alt}
          className={cn(
            "object-cover w-full h-full",
          )}
        />
      </div>
      {title && (
        <div className="p-3">
          <h3 className="text-sm font-medium truncate">{title}</h3>
        </div>
      )}
    </Card>
  )
}

export default ImageCard
