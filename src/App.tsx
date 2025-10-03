import { ImageGrid } from "./components/image/ImageGrid"

const sampleImages = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://source.unsplash.com/random/800x600?sig=${i}`,
  title: `Random image ${i + 1}`,
}))

function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Content Generator</h1>
        <p className="text-sm text-muted-foreground mt-1">A gallery built with shadcn-style components</p>
      </header>

      <main>
        <ImageGrid images={sampleImages} />
      </main>
    </div>
  )
}

export default App
