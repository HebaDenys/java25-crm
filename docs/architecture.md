# Architecture

Java25 CRM is a monorepo with a clear split between the backend API, the frontend workspace, and local infrastructure.

```text
java25-crm/
  backend/             Spring Boot 4 REST API
  frontend/            React + TypeScript + Vite application
  docker-compose.yml   PostgreSQL and Keycloak for local development
  docs/                Architecture and development notes
```

## Backend

The backend is a Spring Boot 4 application targeting Java 25. It keeps the CRM domain code under `dev.javacrm.crm` and groups features by business capability.

Current packages:

- `dev.javacrm.crm.lead` owns the lead pipeline domain, API DTOs, repository, service, and controller.
- `dev.javacrm.crm.config` owns cross-cutting web configuration.
- `dev.javacrm.crm.common.api` owns shared API behavior such as consistent error responses.

The first backend slice exposes a REST API for lead management and dashboard overview data:

- `GET /api/health`
- `GET /api/leads`
- `POST /api/leads`
- `GET /api/overview`
- `GET /actuator/health`

## Persistence

PostgreSQL is the system of record. Flyway owns schema creation and seed data so local environments, CI, and future deployments can move through the same database lifecycle.

Current migrations:

- `V1__create_leads.sql` creates the `leads` table and indexes.
- `V2__seed_leads.sql` inserts realistic starter CRM data.

Hibernate validates the schema on startup. It should not create production tables automatically.

## Frontend

The frontend is a React + TypeScript + Vite application targeting Node 24. It keeps UI, API access, types, and formatting helpers separated:

- `src/api` contains browser API clients.
- `src/components` contains reusable CRM UI sections.
- `src/lib` contains small shared utilities.
- `src/types` contains shared TypeScript domain types.

Vite proxies `/api` to `http://localhost:8080` during development, so browser code can use stable relative API paths.

## Authentication Direction

Keycloak is included in Docker Compose as the planned identity provider. The current API is intentionally unauthenticated while the core CRM domain is being shaped. The next security milestone should add OAuth2 resource server configuration to the backend and a login flow in the frontend.

## Quality Gates

The default quality checks are:

- Frontend linting with ESLint.
- Frontend production build with TypeScript and Vite.
- Backend compilation and integration tests with Maven.
- Fast backend integration tests with an in-memory H2 database in PostgreSQL mode.
- GitHub Actions CI on pushes to `main` and pull requests.
