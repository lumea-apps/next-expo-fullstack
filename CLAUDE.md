# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

```bash
# Development
bun run dev              # Run all apps (web + mobile)
bun run dev:web          # Run only Next.js (localhost:3000)
bun run dev:mobile       # Run only Expo mobile

# Build & Lint
bun run build            # Build all apps
bun run lint             # Lint all apps

# Database (Drizzle + Neon PostgreSQL)
bun run db:generate      # Generate migrations
bun run db:migrate       # Apply migrations
bun run db:push          # Push schema to DB (dev only)

# Mobile platform-specific
cd apps/mobile && bun run ios       # iOS simulator
cd apps/mobile && bun run android   # Android emulator
cd apps/mobile && bun run web       # Web browser
```

## Architecture

Turborepo monorepo with Next.js web/API and Expo mobile sharing types.

```
├── apps/
│   ├── web/           # Next.js 16 (frontend + API routes)
│   └── mobile/        # Expo 54 (iOS/Android/Web)
├── packages/
│   └── shared/        # Shared TypeScript types (@lumea/shared)
├── turbo.json         # Turborepo task configuration
└── .env.example       # Required environment variables
```

**Data flow:** Expo mobile → Next.js API routes (`/api/*`) → Drizzle ORM → Neon PostgreSQL

## Package Manager

**Bun 1.2.7+** required. All commands run from monorepo root.

## Shared Types

```typescript
import type { User, ApiResponse, PaginatedResponse } from '@lumea/shared/types';
```

Update `packages/shared/src/types/index.ts` when adding new shared interfaces.

## Environment Variables

Copy `.env.example` to `.env.local`:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL` - Web app URL (http://localhost:3000 for dev)
- `EXPO_PUBLIC_API_URL` - API URL for mobile app

---

## Web App (apps/web)

**Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (new-york style)

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components (50+ pre-installed)
- `lib/utils.ts` - `cn()` utility for class merging
- `lib/db/schema.ts` - Drizzle schema
- `hooks/` - Custom React hooks

### Path Aliases
Use `@/*` for imports from project root.

### Styling
- CSS variables in `app/globals.css` using OKLCH color space
- Dark mode via `.dark` class with `@custom-variant dark (&:is(.dark *))`

### Libraries
- **Forms:** react-hook-form + zod
- **UI:** sonner (toasts), vaul (drawers), cmdk (command palette), recharts, embla-carousel, react-resizable-panels
- **Icons:** lucide-react

### Tailwind CSS v4 Fonts (CRITICAL)

Tailwind v4 uses CSS-first configuration. Fonts are configured in CSS, not `tailwind.config.js`.

**Current setup with next/font:**

`layout.tsx`:
```tsx
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
<body className={`${geistSans.variable} antialiased`}>
```

`globals.css`:
```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

**Key rules:**
- Use `@theme inline` when referencing CSS variables from next/font
- Use `@theme` when defining fonts directly (e.g., from Google Fonts URL)
- `@import url()` MUST come BEFORE `@import "tailwindcss"`
- `@font-face` declarations must be OUTSIDE `@layer` blocks

---

## Mobile App (apps/mobile)

**Stack:** Expo 54, React Native 0.81 (New Architecture), React 19, NativeWind v4, Expo Router

### Routing
- `app/` - Expo Router file-based routing
- `app/(tabs)/` - Tab navigation group
- `app/_layout.tsx` - Root layout
- `app/+html.tsx` - Web-only HTML template with NativeWind CSS

### Path Aliases
Use `@/*` or `~/*` for imports from project root.

### NativeWind Usage
```tsx
<View className="flex-1 bg-white dark:bg-black p-4">
  <Text className="text-lg font-bold text-gray-900 dark:text-white">
    Hello NativeWind!
  </Text>
</View>
```

### Icons
```tsx
import { Home, Settings } from 'lucide-react-native';
<Home size={24} color="#000" />
```

### Critical Configuration
- `metro.config.js`: **maxWorkers is set to 2 - DO NOT MODIFY** (intentional for system stability)
- `app.json`: `newArchEnabled: true`, `typedRoutes: true`
- `web.output: "single"` - Required for NativeWind v4 compatibility (static export not supported)
