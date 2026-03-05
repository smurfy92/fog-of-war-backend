# Fog of War — Backend

NestJS + PostgreSQL backend for user auth and location storage.

## Setup

```bash
# Install dependencies
npm install

# Copy and configure env
cp .env.example .env

# Start dev server
npm run start:dev
```

## Environment variables (.env)

| Variable | Default | Description |
|---|---|---|
| `DATABASE_HOST` | `localhost` | Postgres host |
| `DATABASE_PORT` | `5432` | Postgres port |
| `DATABASE_USER` | `postgres` | Postgres user |
| `DATABASE_PASSWORD` | `postgres` | Postgres password |
| `DATABASE_NAME` | `fog_of_war` | Database name |
| `JWT_SECRET` | `changeme` | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | Token expiry |
| `PORT` | `3000` | HTTP port |

## API Endpoints

### Auth

| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{ email, password }` | Create account |
| POST | `/api/auth/login` | `{ email, password }` | Login, returns JWT |

### Locations (requires `Authorization: Bearer <token>`)

| Method | Path | Body | Description |
|---|---|---|---|
| POST | `/api/locations` | `{ latitude, longitude, accuracy?, visitedAt }` | Add one location |
| POST | `/api/locations/bulk` | `{ locations: [...] }` | Add many at once |
| GET | `/api/locations` | — | Get all visited locations |
| DELETE | `/api/locations` | — | Clear all locations |

## Database

Tables are auto-created on first run (`synchronize: true`). Set to `false` and use migrations in production.
