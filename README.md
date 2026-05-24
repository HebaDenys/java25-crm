# Java25 CRM

Java25 CRM is a full-stack customer relationship management platform for sales teams. The project combines a Java 25 backend, PostgreSQL data storage, and a React frontend into a practical CRM for managing leads, companies, deals, activities, and customer relationships.

## Vision

The project aims to become a complete CRM that helps sales teams work from one place: tracking prospects, managing opportunities, following activity history, collaborating on tasks, and reviewing the health of the sales pipeline.

The first version will focus on a single-organization CRM to keep the foundation simple and reliable. The design should still leave room for a future multi-tenant SaaS model if the project grows in that direction.

## Planned Stack

| Area | Technology |
| --- | --- |
| Backend | Java 25, Spring Boot 4 |
| Frontend | Node 24, React, TypeScript, Vite |
| Database | PostgreSQL |
| Local infrastructure | Docker Compose |
| Authentication | Keycloak |
| API style | REST JSON first, with GraphQL evaluated later if needed |
| Repository model | Monorepo |

## Architecture

The project uses a monorepo layout with separate backend and frontend applications:

```text
java25-crm/
  backend/             # Java 25 + Spring Boot 4 REST API
  frontend/            # Node 24 + React + TypeScript + Vite app
  docker-compose.yml   # PostgreSQL and Keycloak for local development
```

The backend will expose the CRM domain through REST APIs, persist data in PostgreSQL, and integrate with Keycloak for authentication and authorization. The frontend will provide the sales workspace for managing records, pipeline activity, dashboards, and daily sales tasks.

## Running Locally

Requirements:

- Java 25
- Node.js 24
- npm 11+
- Docker with Docker Compose
- Maven 3.9+

If your shell is not already using Java 25, switch it first. On this machine the local helper is:

```bash
jswitch 25 permsys
```

Or set `JAVA_HOME` to the installed JDK 25 path before running Maven.

Start PostgreSQL and Keycloak:

```bash
npm run dev:infra
```

Install frontend/root dependencies:

```bash
npm install
```

Run the backend and frontend in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

The application will be available at:

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:8080/api>
- Backend health: <http://localhost:8080/actuator/health>
- Keycloak: <http://localhost:8081>

## MVP Roadmap

The first implementation phase should focus on the core workflows a sales team needs every day:

- Contacts and companies
- Leads and opportunities
- Sales pipeline and deals
- Tasks and activities
- Notes and customer timeline
- Dashboard and reports
- User roles and permissions
- Keycloak-based sign-in and access control
- PostgreSQL-backed persistence
- Local development with Docker Compose

## Extended Roadmap

After the core CRM is usable, the project can grow into broader business workflows:

- Email integration
- Customer support tickets
- Products, quotes, and invoices
- Advanced sales reporting
- Import and export tools
- Audit history for important customer data
- Notification and reminder system
- Future evaluation of multi-tenant SaaS support

## Development Principles

- Keep the project understandable and maintainable.
- Build the domain model around real CRM workflows, not only database tables.
- Prefer clear REST APIs for the initial application surface.
- Use PostgreSQL features intentionally where they improve data integrity and reporting.
- Keep the frontend fast, typed, and ergonomic for repeated daily use.
- Add infrastructure and automation only when they support the product direction.

## Project Status

Initial implementation stage. The repository includes a runnable Spring Boot 4 API, PostgreSQL migrations with seed CRM data, a React/Vite dashboard, and Docker Compose services for PostgreSQL and Keycloak.

## License

This project is planned as open source under the MIT License.
