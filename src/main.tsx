import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexProvider } from 'convex/react'
import { convexReactClient } from './lib/convex.ts'
import { Toaster } from '@/components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convexReactClient}>
      <App />
      <Toaster position="top-right" richColors />      
    </ConvexProvider>
  </StrictMode>,
)
