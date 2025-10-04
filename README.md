# AI Content Generator

A React-based application for generating content and images from visual templates using AI. Built with Vite, TypeScript, and shadcn/ui components, featuring a masonry gallery for browsing and uploading templates.

## About the Project

This project lets users explore a gallery of visual templates. Upload your own images to create AI-generated templates, select one, add a topic, and generate customized content and new images based on the template.

## How it Works

1. **Upload Templates**: Upload an image, and AI analyzes it to create a reusable template with design elements and a customizable prompt.
2. **Browse and Select**: View templates in a responsive masonry gallery. Hover for previews and click to select.
3. **Customize and Generate**: Enter a topic. AI adjusts the prompt and generates content (text) and eventually a new image matching the template style.
4. **AI-Powered Process**: Everything uses AI – from template creation to content and image generation.

## Key Features

- Masonry image gallery with hover interactions
- Upload custom image templates
- AI-powered template creation from image uploads
- Template selection and topic-based content generation
- AI-driven content and image generation
- shadcn/ui components for consistent styling
- Convex backend integration for data management
- TypeScript for type safety

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Backend**: Convex
- **AI**: Google Gemini (via @ai-sdk/google)
- **Icons**: Lucide React
- **Package Manager**: npm, yarn, or bun

## How to Run

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm, yarn, or bun package manager
- Convex account and CLI (for backend)

### Installation
```bash
# Install dependencies
npm install
# or
bun install
```

### Setup Convex
```bash
# Initialize Convex in your project (if not already done)
bunx convex dev
# or
npx convex dev

# This will set up your Convex backend and provide a deployment URL
```

### Development
```bash
# Start the development server
npm run dev
# or
bun run dev

# In another terminal, run Convex dev server
convex dev
```

### Build
```bash
# Build for production
npm run build
```

### Preview
```bash
# Preview the production build
npm run preview
```
