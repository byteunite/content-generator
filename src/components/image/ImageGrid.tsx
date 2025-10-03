import ImageCard from "./ImageCard"

interface ImageItem {
  src: string
  alt?: string
  title?: string
}

interface ImageGridProps {
  images: ImageItem[]
}

export function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((img, idx) => (
        <ImageCard key={idx} src={img.src} alt={img.alt} title={img.title} />
      ))}
    </div>
  )
}

export default ImageGrid
