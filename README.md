# Vibestrym — Monorepo

This repository contains the Vibestrym project: a full-stack streaming/dashboard application with a NestJS backend, a Next.js frontend, and a small Unsplash downloader utility. This global README shows how to run the repo locally (backend, frontend, and downloader), how to use Docker for databases, and common troubleshooting steps.

## Prerequisites

- Node.js 18+ (recommended). Install from https://nodejs.org/
- Yarn or npm (examples use `yarn` / `npm`).
- Docker & Docker Compose (for local Postgres + Redis).
- On macOS with Apple Silicon, ensure Docker supports arm64 images.

If you're a beginner: install Node.js first, then open a terminal and run `node -v` and `npm -v` to confirm.

## Project layout

- `backend/` — NestJS + GraphQL server, Prisma ORM, Redis, Docker setup.
- `frontend/` — Next.js app (App Router) with Apollo Client and UI components.
- `unsplash-downloader/` — small Node script to download category thumbnails from Unsplash.

## Quick start (recommended order)

1. Start Docker (Postgres + Redis) for the backend.
2. Install dependencies for backend and frontend.
3. Run backend (dev watch mode).
4. Run frontend (dev server).

Below are detailed step-by-step instructions and examples for each part.

**Note:** all commands assume you're in the repository root. Use `cd backend` or `cd frontend` to enter subprojects.

## Backend (NestJS)

This section shows how to run the backend locally and with Docker-provided Postgres + Redis.

1. Start Docker services

If you want to use the included Docker Compose setup (recommended for beginners), run:

```bash
cd backend
docker-compose up -d
```

This will create Postgres (default port in compose may be 5433) and Redis. Wait a few seconds for the containers to initialize.

2. Install dependencies

Using yarn:

```bash
yarn install
```

Or npm:

```bash
npm install
```

3. Configure environment

Create a `.env` in `backend/` if required. Example variables typically needed:

```env
# Example .env (adjust values as needed)
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/vibestrym
REDIS_URL=redis://:password@localhost:6379
JWT_SECRET=your_jwt_secret_here
```

The `backend/README.md` includes more details about environment options.

4. Prepare database with Prisma

Format and push the Prisma schema and generate client:

```bash
yarn run db:format
yarn run db:push
yarn run generate-schemas
```

If you need to seed the database:

```bash
yarn run db:seed
```

5. Run the backend

Development (watch mode):

```bash
yarn run start:dev
```

Production build and run:

```bash
yarn run build
yarn run start:prod
```

6. GraphQL playground & health

When the server is running, GraphQL endpoints and health checks are available (see `src/core/graphql` and `src/core/health` for routes). Common GraphQL playground URL: `http://localhost:3000/graphql` (confirm logs when server starts).

## Frontend (Next.js)

1. Install dependencies

From the root or `frontend/` folder:

```bash
cd frontend
bun install # or npm/yarn install
```

If you don't use `bun`, run `yarn install` or `npm install`.

2. Configure environment

Create an `.env` or add environment variables required by the frontend (Apollo, Sentry DSN, feature flags). See `frontend/README.md` and `src/libs/apollo-client.ts` for clues.

3. Run the dev server

```bash
bun run dev
# or
yarn run dev
# or
npm run dev
```

Open `http://localhost:3000` in your browser.

4. Codegen (optional)

If you want to regenerate GraphQL types/hooks:

```bash
bun run codegen
# or npm/yarn equivalent
```

## Unsplash Downloader

This is a small utility for downloading category thumbnails from Unsplash.

1. Go to the downloader folder and install:

```bash
cd unsplash-downloader
npm install
```

2. Create `.env` with your Unsplash key:

```env
UNSPLASH_ACCESS_KEY=your_access_key_here
IMAGE_WIDTH=285
IMAGE_HEIGHT=380
DOWNLOAD_DELAY=2000
FILE_LOCATION=./categories.json
```

3. Run the downloader

```bash
npm run start
```

Check the `downloads/` folder for images.

## Using Docker for full stack (optional)

You can run the `backend/docker-compose.yml` to bring up Postgres and Redis. After starting Docker Compose, run the backend and frontend as described above. The Docker compose file does not run the app containers themselves; it only provides the supporting services (DB, cache).

## Troubleshooting

- Docker container not starting: run `docker-compose logs` in `backend/` to inspect logs.
- Prisma connection errors: verify `DATABASE_URL` matches the ports used by Docker Compose (Postgres on 5433 by default in this repo) and run `yarn run db:push`.
- Port conflicts: ensure `3000` and `3001` are free (common frontend/backend ports); change `PORT` env variables if needed.
- Unsplash 403 errors: check your access key and API rate limits.

If you see any errors while following these steps, open an issue or ask for help with the exact error text and which step you ran.

## Next steps & references

- Backend docs: see [backend/README.md](backend/README.md)
- Frontend docs: see [frontend/README.md](frontend/README.md)
- Unsplash downloader: see [unsplash-downloader/README.md](unsplash-downloader/README.md)

Would you like me to run dependency installs, start Docker, or generate a ready-to-run `.env.example` for any subproject now?
