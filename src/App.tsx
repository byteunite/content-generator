import { Routes, Route } from 'react-router'
import { TemplatesPage } from './pages/TemplatesPage'
import { OutputsPage } from './pages/OutputsPage'
import { FloatingNav } from './components/navigation/FloatingNav'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TemplatesPage />} />
        <Route path="/outputs" element={<OutputsPage />} />
      </Routes>
      <FloatingNav />
    </>
  )
}

export default App
