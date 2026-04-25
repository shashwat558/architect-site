# AD.RS Design Studio

Production-grade Next.js architecture & interior design website for **Ad.Rs Design Studio**, Bhopal.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion v11) |
| 3D | React Three Fiber + Three.js |
| ORM | Prisma + PostgreSQL |
| Auth | NextAuth.js |
| Media | Cloudinary |
| Fonts | Geist, Playfair Display, Roboto |

---

## Project Structure

```
adrs/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, schema JSON-LD, providers)
│   ├── page.tsx                  # Home page (metadata + HomeClient shell)
│   ├── home-client.tsx           # Client home page assembly
│   │
│   ├── config/
│   │   └── navigation.ts         # ✅ Single source of truth for all nav links
│   │
│   ├── data/
│   │   ├── types.ts              # ✅ Pure TypeScript type definitions
│   │   ├── content.ts            # ✅ All static page content
│   │   └── dummyData.ts          # ↩️  Backward-compat re-export shim (migration)
│   │
│   ├── components/
│   │   ├── layout/               # ✅ Shell components — Header, Footer, MenuOverlay
│   │   │   └── index.ts          # Barrel export
│   │   ├── sections/             # ✅ Page section components
│   │   │   └── index.ts          # Barrel export
│   │   ├── hero/                 # ✅ Hero — Canvas, Mesh, Typography, shaders
│   │   ├── ui/                   # ✅ Reusable primitives — Cursor, Magnetic, etc.
│   │   │   └── index.ts          # Barrel export
│   │   └── loaders/              # ✅ Intro loaders + config
│   │
│   ├── context/
│   │   └── CursorContext.tsx     # Cursor state provider
│   │
│   ├── lib/                      # Client-facing utilities
│   │   ├── seo.ts
│   │   ├── meta-tags.tsx
│   │   └── performance-monitoring.ts
│   │
│   ├── api/                      # API routes
│   ├── admin/                    # Admin dashboard pages
│   ├── about/ contact/ process/ projects/  # Route pages
│   └── globals.css
│
├── lib/                          # Server-side utilities (Prisma, Auth, Cloudinary)
│   ├── prisma.ts
│   ├── auth.ts
│   ├── cloudinary.ts
│   ├── rate-limit.ts
│   └── spam-protection.ts
│
├── components/                   # Shadcn-style library components (aliased via @/)
│   └── ui/
│       └── animated-testimonials.tsx
│
├── prisma/                       # DB schema + migrations
├── public/                       # Static assets
├── docs/                         # Project documentation
└── scripts/                      # Dev/build scripts
```

### Key Conventions

1. **Types vs Content**: Types live in `app/data/types.ts`. Content values live in `app/data/content.ts`. Never mix them.
2. **Navigation**: All nav links are defined once in `app/config/navigation.ts`. Header, Footer, and MenuOverlay all read from there.
3. **Imports**: Prefer importing from barrel `index.ts` files when importing multiple components from the same folder. Use direct imports for single imports to keep tree-shaking effective.
4. **Lazy Loading**: Heavy below-fold sections are all `dynamic()` imported with `ssr: false` in `home-client.tsx`.
5. **Server vs Client lib**: Root `lib/` is Node.js/server-only. `app/lib/` is safe for client-side use.

---

## Development

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript type check
```

---

## Environment Variables

See `.env.example` for required variables (DB, Auth, Cloudinary, etc.)
