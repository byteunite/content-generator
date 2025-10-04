# Content Generator

A React-based application for generating content from visual templates. Built with Vite, TypeScript, and shadcn/ui components, featuring a masonry gallery for browsing and uploading templates.

## About the Project

This project allows users to browse a gallery of visual templates, each with an associated image and prompt. Users can upload their own image templates, select a template, fill in the topic, and generate content based on the template. The UI emphasizes a clean, modern design with responsive masonry layout and accessible components.

Key features:
- Masonry image gallery with hover interactions
- Upload custom image templates
- Template selection and topic-based content generation
- shadcn/ui components for consistent styling
- Convex backend integration for data management
- TypeScript for type safety

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

## Creator

Created by byteunite.