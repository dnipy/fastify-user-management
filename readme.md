# Fastify User Management App

A `Fastify` based user management system that integrates with `MySQL`, `Prisma`, and `Docker` for seamless development and deployment.

## Features
- **Fastify Framework** for a fast and efficient backend.
- **Prisma ORM** for database migrations and querying.
- **Dockerized** setup for easy development and production deployment.
- **MySQL Database** for data persistence.
- Environment-based configurations using **dotenv**.
- API documentation with **Swagger**.

---



## Explain Arch 
- entry point `server.ts` => load global `.env` files and phase based .env file `dev` or `prod`
- after loading envs , we use `bootstrap` method and pass our app instance to it
- inside `bootstrap` , we initialize app (app.listen) and register our global `router` and our `plugins` and `middlewares`
- in our router we setup api route and its *versioning*
- in our api-router we register `user-router`
- in user router we build our user module with `@controllers` , `@services` , `@schemas` and `@types`
- `@controllers` =  **/controllers**  routes handlers 
- `@schemas` =  **/schemas**  route validations 
- `@services` =  **/services**  business logic handlers
- `@types` =  **/types**  typeing and interfaces

## to run the app we only need to use docker like :
``` bash
docker compose up -d
```




## Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Installation

### 1. Clone the repository
```bash
git clone git@github.com:dnipy/fastify-user-management.git
cd fastify-user-management
```
### 2. Setup environment variables
```bash
yarn install
```
or
```bash
npm install
```
### 3. Build and start the Docker containers and Project and migrate db in dev mode and seed it and Run the Project
```bash
npm run docker:up
```
or
```bash
docker-compose up -d
```


## ***scripts***


### 1. ``` "dev": "nodemon" ```
Purpose: Start the application in development mode.
What It Does:
Uses nodemon, which monitors your files for changes.
Automatically restarts the application whenever a file changes.
Ideal for development to avoid manually restarting the server.

---

### 2. ```"start": "cross-env NODE_ENV=production node dist/src/server.js"```
Purpose: Start the application in production mode.
What It Does:
Sets the NODE_ENV environment variable to production using cross-env, which works across operating systems.
Runs the compiled server.js file from the dist/src directory.
Used when deploying the app to a production environment.

---

### 3. ```"test": "cross-env NODE_ENV=test jest"```
Purpose: Run the test suite.
What It Does:
Sets the NODE_ENV to test.
Runs the test files using jest, a JavaScript testing framework.

---

### 4. ```"build": "tsc"```
Purpose: Build the application.
What It Does:
Runs the TypeScript compiler (tsc) to compile your TypeScript files into JavaScript.
Outputs the compiled files to the dist/ directory (default output for TypeScript builds).

---

### 5. ```"studio": "npx prisma studio"```
Purpose: Launch Prisma Studio, a web interface for managing your database.
What It Does:
Starts a local server with a graphical UI to view and manipulate your database.

---

### 6. ```"migrate:dev": "npx prisma migrate dev"```
Purpose: Apply database migrations in development.
What It Does:
Uses Prisma's migration tool to sync your database schema with your prisma/schema.prisma file.
Creates and applies migration files to your development database.

---

### 7. ```"seed-db": "npx ts-node ./prisma/seed.ts"```
Purpose: Seed the database with initial data.
What It Does:
Uses ts-node to run the prisma/seed.ts file (written in TypeScript) to insert predefined data into your database.

---

### 8. ```"docker:up": "docker-compose up -d"```
Purpose: Start the Docker containers.
What It Does:
Uses docker-compose to start all defined services (e.g., db and app) in detached mode (-d).

---

### 9. ```"docker:down": "docker-compose down"```
Purpose: Stop and remove all Docker containers, networks, and volumes defined in docker-compose.yml.
What It Does:
Cleanly stops all services and removes associated resources.

---

### 10. ```"docker:logs": "docker-compose logs -f"```
Purpose: View logs from all Docker containers in real time.
What It Does:
Fetches and streams logs from all services (-f keeps the logs updating live).

---

### 11. ```"docker:build": "docker-compose build"```
Purpose: Build Docker images for all services.
What It Does:
Rebuilds the Docker images for all services defined in docker-compose.yml.
Useful if you make changes to the Dockerfile or dependencies.

---

**Usae Tips**

- Development: Use npm run dev for active development with auto-restart on file changes.
- Production: Use npm run build to compile the app and then npm run start to run the production build.
- Database: Use npm run migrate:dev to update the database schema and npm run seed-db to populate initial data.
- Docker: Use npm run docker:up to start the full stack and npm run docker:logs to debug issues.
