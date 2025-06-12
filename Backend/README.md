<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Job API - Backend

A RESTful API for job listings built with NestJS, Prisma, and PostgreSQL. This API provides endpoints for managing job listings with authentication and AI-powered job description generation.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up the Database](#3-set-up-the-database)
  - [4. Configure Environment Variables](#4-configure-environment-variables)
  - [5. Generate Prisma Client](#5-generate-prisma-client)
  - [6. Run Database Migrations](#6-run-database-migrations)
  - [7. Start the Application](#7-start-the-application)
- [Project Structure](#project-structure)
- [Services Overview](#services-overview)
  - [PrismaService](#prismaservice)
  - [JobsService](#jobsservice)
  - [AuthService](#authservice)
  - [JobDescriptionService](#jobdescriptionservice)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [License](#license)

## Features

- CRUD operations for job listings
- Input validation with DTOs (Data Transfer Objects)
- Error handling with appropriate HTTP status codes
- Authentication with JWT (JSON Web Tokens)
- PostgreSQL database with Prisma ORM
- AI-powered job description generation using OpenRouter API

## API Endpoints

### Jobs

- `GET /jobs` - List all jobs
- `GET /jobs/:id` - Get a single job post
- `POST /jobs` - Create a new job post (requires authentication)
- `PUT /jobs/:id` - Update an existing job (requires authentication)
- `DELETE /jobs/:id` - Delete a job post (requires authentication)
- `POST /jobs/generate-description` - Generate a job description using AI (requires authentication and OpenRouter API key)

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

## Tech Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Advanced open-source relational database
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [OpenRouter API](https://openrouter.ai/) - AI API for generating job descriptions

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (for running PostgreSQL)
- [OpenRouter API key](https://openrouter.ai/) for job description generation

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

You can run PostgreSQL in Docker using the following command:

```bash
docker run --name postgres-jobsdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres
```

This command will:
- Create a Docker container named `postgres-jobsdb`
- Set the PostgreSQL user to `postgres`
- Set the PostgreSQL password to `postgres`
- Create a database called `mydb`
- Map port 5432 from the container to port 5432 on your host machine
- Run the container in detached mode (`-d`)

### 4. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
JWT_SECRET="your-secure-jwt-secret-key"
PORT=8000
OPENROUTER_API_KEY="your-openrouter-api-key"
```

Make sure to replace `your-secure-jwt-secret-key` with a secure random string and `your-openrouter-api-key` with your actual OpenRouter API key.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This command will create the necessary tables in your database based on the Prisma schema.

### 7. Start the Application

For development:

```bash
npm run start:dev
```

For production:

```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:8000`.

## Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── dto/               # Data Transfer Objects for auth
│   ├── guards/            # JWT guards
│   ├── strategies/        # Passport strategies
│   ├── auth.controller.ts # Auth endpoints
│   ├── auth.module.ts     # Auth module definition
│   └── auth.service.ts    # Auth business logic
├── jobs/                  # Jobs module
│   ├── dto/               # Data Transfer Objects for jobs
│   ├── jobs.controller.ts # Jobs endpoints
│   ├── jobs.module.ts     # Jobs module definition
│   ├── jobs.service.ts    # Jobs business logic
│   └── job-description.service.ts # AI job description generation
├── prisma/                # Prisma module
│   ├── prisma.module.ts   # Prisma module definition
│   └── prisma.service.ts  # Prisma client service
├── app.controller.ts      # App controller
├── app.module.ts          # Main application module
├── app.service.ts         # App service
└── main.ts               # Application entry point
```

## Services Overview

### PrismaService

The `PrismaService` is responsible for database operations using Prisma Client. It extends the `PrismaClient` class and manages the connection lifecycle.

Key features:
- Database connection management
- Transaction support
- Auto-disconnect on application shutdown

### JobsService

The `JobsService` handles all job-related operations:

- Retrieving all jobs
- Finding a specific job by ID
- Creating new job listings
- Updating existing job listings
- Deleting job listings
- Integration with the AI job description generation service

### AuthService

The `AuthService` manages user authentication:

- User registration with password hashing
- User login with credential verification
- JWT token generation and validation

### JobDescriptionService

The `JobDescriptionService` integrates with OpenRouter's API to generate job descriptions:

- Makes API requests to OpenRouter
- Formats job description prompts based on job titles
- Handles API errors and provides appropriate responses

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

To get a token:
1. Register a user with `POST /auth/register`
2. Login with `POST /auth/login` to receive a JWT token

## Error Handling

The API uses standard HTTP status codes for error responses:

- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side errors

Error responses include a message explaining the error.

## Testing

Run tests with the following commands:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

[MIT](LICENSE)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
