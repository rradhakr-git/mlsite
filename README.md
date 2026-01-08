# ML Innovation Lab Portfolio

A Next.js portfolio site showcasing applied machine learning proof-of-concepts.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3.4
- **Language**: TypeScript
- **Deployment**: Static export for Netlify/Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# The static site will be in the /out directory
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with navigation
│   ├── globals.css        # Global styles + Tailwind
│   └── pocs/
│       ├── page.tsx       # POCs listing page
│       └── [slug]/        # Dynamic POC detail pages
├── components/
│   └── PocCard.tsx        # Reusable POC card component
└── data/
    └── pocs.ts            # POC data store
```

## Deployment

The site is configured for static export. After running `npm run build`, deploy the `/out` directory to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.).

For Netlify:
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

## License

All rights reserved. © ML Innovation Lab
