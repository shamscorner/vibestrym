# Vibestrym Backend

Backend for Vibestrym, built with [NestJS](https://nestjs.com/) and TypeScript. This project provides a scalable server-side application with GraphQL, Prisma ORM, Redis, and more.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Docker](#docker)
- [Database & Prisma](#database--prisma)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Deployment](#deployment)
- [Resources](#resources)

## Features

- NestJS framework (TypeScript)
- GraphQL API
- Prisma ORM (PostgreSQL)
- Redis integration
- Authentication & Authorization
- Cron jobs
- Notification system
- Streaming & chat modules
- Webhooks

## Project Structure

```
src/
  main.ts                # App entry point
  core/                  # Core modules (config, prisma, redis)
  modules/               # Feature modules (auth, cron, follow, notification, stream, webhook)
  shared/                # Shared utilities, decorators, guards, types
test/                    # E2E and unit tests
prisma/                  # Prisma schema and generated client
docker-compose.yml       # Docker setup for Postgres and Redis
package.json             # Project scripts and dependencies
```

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/) (or npm)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

### 1. Clone the repository

```bash
git clone <repo-url>
cd vibestrym/backend
```

### 2. Start Docker containers

This will start PostgreSQL (on port 5433) and Redis (on port 6379):

```bash
docker-compose up -d
```

### 3. Install dependencies

```bash
yarn install
# or
npm install
```

## Docker

The `docker-compose.yml` sets up:

- **Postgres** (with environment variables for user, password, database)
- **Redis** (with password from env)

You can customize environment variables in a `.env` file (not included by default).

## Database & Prisma

### Format and push schema

```bash
yarn run db:format      # Format Prisma schema
yarn run db:push        # Format and push schema to database
yarn run generate-schemas # Generate Prisma client and format schema
```

### Seed database

```bash
yarn run db:seed
```

### Open Prisma Studio

```bash
yarn run db:studio
```

## Running the App

### Development

```bash
yarn run start
```

### Watch mode (auto-reload)

```bash
yarn run start:dev
```

### Debug mode

```bash
yarn run start:debug
```

### Production

```bash
yarn run build
yarn run start:prod
```

## Testing

### Unit tests

```bash
yarn run test
```

### E2E tests

```bash
yarn run test:e2e
```

### Test coverage

```bash
yarn run test:cov
```

## Other Useful Scripts

- **Lint:**
    ```bash
    yarn run lint
    ```
- **Format code:**
    ```bash
    yarn run format
    ```
- **Ngrok tunnel (for webhooks):**
    ```bash
    yarn run ngrok:start
    ```

## Deployment

See [NestJS deployment docs](https://docs.nestjs.com/deployment) for best practices.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Discord Support](https://discord.gg/G7Qnnhy)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
