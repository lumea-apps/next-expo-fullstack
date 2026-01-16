# Lumea Fullstack Template

A monorepo template with **Next.js** (web + API) and **Expo** (mobile), powered by **Turborepo**.

## Stack

- **Web**: Next.js 16, React 19, Tailwind CSS, shadcn/ui
- **Mobile**: Expo 54, React Native, NativeWind
- **Database**: Drizzle ORM + Neon PostgreSQL
- **Monorepo**: Turborepo + Bun workspaces

## Project Structure

```
├── apps/
│   ├── web/          # Next.js (web frontend + API backend)
│   └── mobile/       # Expo (mobile app)
├── packages/
│   └── shared/       # Shared types and utilities
├── package.json      # Root workspace config
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.2.7+
- [Node.js](https://nodejs.org/) 18+

### Installation

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env.local
```

### Development

```bash
# Run all apps
bun run dev

# Run only web
bun run dev:web

# Run only mobile
bun run dev:mobile
```

### Database

```bash
# Generate migrations
bun run db:generate

# Apply migrations
bun run db:migrate

# Push schema (dev only)
bun run db:push
```

## Architecture

```
┌─────────────────────────────────────────┐
│           Next.js (apps/web)            │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Web UI    │  │   API Routes    │   │
│  │   (React)   │  │    /api/*       │   │
│  └─────────────┘  └────────┬────────┘   │
└────────────────────────────┼────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
          [Web Browser]           [Expo Mobile]
                                  (apps/mobile)
                                        │
                                        ▼
                              ┌─────────────────┐
                              │   Neon (DB)     │
                              └─────────────────┘
```

- **Next.js** serves both the web UI and API routes
- **Expo mobile app** calls the Next.js API
- Both share types from `packages/shared`

## Deployment

| Component | Platform |
|-----------|----------|
| Web + API | Vercel or Cloudflare Pages |
| Mobile | EAS Build |
| Database | Neon |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [Neon](https://neon.tech/docs)
- [Turborepo](https://turbo.build/repo/docs)

---

Built with [Lumea](https://lumea.dev)
