import { ImageGrid } from "./components/image/ImageGrid"
import ImageUploadDialog from "./components/image/ImageUploadDialog"

const initialImages = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://source.unsplash.com/random/800x600?sig=${i}`,
  title: `Random image ${i + 1}`,
}))

function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">A gallery built with shadcn-style components</p>
        </div>
        <div>
          <ImageUploadDialog />
        </div>
      </header>

      <main>
        <ImageGrid images={initialImages} />
      </main>
    </div>
  )
}

export default App
