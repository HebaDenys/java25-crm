# Development Guide

## Requirements

- Java 25
- Maven 3.9+
- Node.js 24
- npm 11+
- Docker with Docker Compose

On this workstation, Java 25 is installed at `C:\Program Files\Java\jdk-25`. If a shell still shows Java 21, switch to Java 25 first:

```bash
jswitch 25 permsys
```

In Git Bash, this explicit setup also works:

```bash
JAVA_HOME="/c/Program Files/Java/jdk-25" PATH="/c/Program Files/Java/jdk-25/bin:$PATH" java -version
```

## First Run

Install dependencies:

```bash
npm install
```

Start local infrastructure:

```bash
npm run dev:infra
```

Run backend and frontend in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

Useful URLs:

- Frontend: <http://localhost:5173/>
- Backend API: <http://localhost:8080/api>
- Backend health: <http://localhost:8080/actuator/health>
- Keycloak: <http://localhost:8081>

## Commands

```bash
npm run test
npm run build
npm run test:frontend
npm run test:backend
npm run build:frontend
npm run build:backend
```

Backend tests use H2 in PostgreSQL compatibility mode for a fast local feedback loop. The running application still uses PostgreSQL through Docker Compose.

## Environment

Default local values are documented in `.env.example`. The backend also provides safe local defaults for PostgreSQL connection settings in `backend/src/main/resources/application.yml`.

## Troubleshooting

If Maven fails with a Java version error, verify the active JDK:

```bash
java -version
mvn -v
```

If Flyway reports PostgreSQL as unsupported, keep both dependencies in `backend/pom.xml`:

- `spring-boot-starter-flyway`
- `flyway-database-postgresql`

If the frontend cannot reach the backend, verify the backend is running on port `8080` and that Vite is serving on port `5173`.
