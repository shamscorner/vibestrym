
# Vibestrym Frontend

>This is a modern [Next.js](https://nextjs.org) application built for real-world streaming and dashboard experiences. It features strict type safety, accessibility, and code quality standards enforced by [Ultracite](https://github.com/ultracite/ultracite) and [Biome](https://biomejs.dev/).

## Features
- **Next.js 15+** with App Router and Turbopack
- **TypeScript** throughout
- **Apollo Client** for GraphQL
- **Radix UI** and custom UI components
- **LiveKit** for real-time streaming
- **Zod** for schema validation
- **Sentry** for error monitoring
- **Tailwind CSS** for styling
- **Internationalization** with `next-intl`
- **State management** with Zustand
- **Accessibility-first**: All UI follows strict a11y rules
- **Automated codegen** for GraphQL types
- **Ultracite** and **Biome** for formatting, linting, and code quality

## Project Structure

- `src/app/` — Next.js app router, layouts, pages, and modules
- `src/components/` — UI components (Radix, custom, icons)
- `src/constants/` — Shared constants
- `src/graphql/` — GraphQL codegen output
- `src/hooks/` — Custom React hooks
- `src/libs/` — Apollo client, i18n, etc.
- `src/providers/` — Context providers
- `src/schemas/` — Zod schemas
- `src/store/` — Zustand stores
- `src/utils/` — Utility functions
- `public/` — Static assets and language files

## Getting Started

Install dependencies:

```bash
bun install # or npm, yarn, bun
```

Run the development server (includes GraphQL codegen):

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Quality & Accessibility

- **Format:** `bun run format` (uses Ultracite)
- **Lint:** `bun run lint` (Next.js + Biome)
- **Accessibility:** Strict a11y rules enforced by Ultracite (see `.github/copilot-instructions.md`)
- **Type Safety:** No `any`, strict types everywhere

## GraphQL Codegen

Generate types and hooks from your GraphQL schema:

```bash
bun run codegen
```

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Ultracite](https://github.com/ultracite/ultracite)
- [Biome](https://biomejs.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [LiveKit](https://livekit.io/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

---

_See `.github/copilot-instructions.md` for enforced coding standards and accessibility rules._
