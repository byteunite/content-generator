import { ImageGrid } from "./components/image/ImageGrid"
import ImageUploadDialog from "./components/image/ImageUploadDialog"

const initialImages = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://picsum.photos/id/${i + 1}/600/600`,
  title: `Template ${i + 1}`,
}))

function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">A gallery of templates where you can upload and use the template to generate content</p>
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
