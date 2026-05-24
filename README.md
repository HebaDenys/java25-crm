# Java25 CRM

Java25 CRM is a planned full-stack customer relationship management platform for sales teams. The goal is to build one clean, production-minded project that combines a Java 25 backend, PostgreSQL data storage, and a React frontend into a practical CRM for managing leads, companies, deals, activities, and customer relationships.

This repository starts as the public planning home for the project. The implementation will be added gradually after the product scope, architecture, and development workflow are defined clearly.

## Vision

The project aims to become a complete CRM that helps sales teams work from one place: tracking prospects, managing opportunities, following activity history, collaborating on tasks, and reviewing the health of the sales pipeline.

The first version will focus on a single-organization CRM to keep the foundation simple and reliable. The design should still leave room for a future multi-tenant SaaS model if the project grows in that direction.

## Planned Stack

| Area | Technology |
| --- | --- |
| Backend | Java 25, Spring Boot |
| Frontend | React, TypeScript, Vite |
| Database | PostgreSQL |
| Local infrastructure | Docker Compose |
| Authentication | Keycloak |
| API style | REST JSON first, with GraphQL evaluated later if needed |
| Repository model | Monorepo |

## Intended Architecture

The future project is expected to use a monorepo layout with separate backend and frontend applications:

```text
java25-crm/
  backend/     # Java 25 + Spring Boot API
  frontend/    # React + TypeScript + Vite app
  infra/       # Docker Compose and local infrastructure configuration
```

The backend will expose the CRM domain through REST APIs, persist data in PostgreSQL, and integrate with Keycloak for authentication and authorization. The frontend will provide the sales workspace for managing records, pipeline activity, dashboards, and daily sales tasks.

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

Planning stage. This repository currently contains only the initial project description, license, and ignore rules. Backend, frontend, database, authentication, and infrastructure code will be added in later milestones.

## License

This project is planned as open source under the MIT License.