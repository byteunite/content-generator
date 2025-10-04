import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { ConvexProvider } from 'convex/react'
import { convexReactClient } from './lib/convex.ts'
import { Toaster } from '@/components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convexReactClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </ConvexProvider>
  </StrictMode>,
)
