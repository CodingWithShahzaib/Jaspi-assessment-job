# Jaspi Job Board

A full-stack job board application with AI-powered job description generation. This project consists of a Next.js frontend and a NestJS backend with PostgreSQL database.

![Job Board Homepage](./assets/landingpage.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [AI-Powered Job Description Generation](#ai-powered-job-description-generation)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

Jaspi Job Board is a modern job listing platform that allows employers to post job opportunities and job seekers to browse available positions. The application features AI-powered job description generation using OpenRouter's API, which can automatically create professional job descriptions based on job titles.

## Features

### Backend Features
- RESTful API with CRUD operations for job listings
- User authentication with JWT
- Input validation with DTOs
- Error handling with appropriate HTTP status codes
- PostgreSQL database with Prisma ORM
- AI-powered job description generation

### Frontend Features
- Responsive modern UI built with Next.js and Tailwind CSS
- Job listing search and filtering
- User authentication and profile management
- Job posting creation with AI-assisted description generation
- Mobile-friendly design

## Tech Stack

### Backend
- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Advanced open-source relational database
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [OpenRouter API](https://openrouter.ai/) - AI API for generating job descriptions

### Frontend
- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React Query](https://react-query.tanstack.com/) - Data fetching library
- [Shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

## Project Structure

```
jaspi/
├── assets/                # Screenshots and images
├── Backend/               # NestJS backend application
│   ├── prisma/            # Prisma schema and migrations
│   ├── src/               # Backend source code
│   │   ├── auth/          # Authentication module
│   │   ├── jobs/          # Jobs module
│   │   ├── prisma/        # Prisma service
│   │   └── ...
├── frontend/              # Next.js frontend application
│   ├── public/            # Static assets
│   ├── src/               # Frontend source code
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── ...
└── README.md              # Project documentation
```

## Screenshots

### Job Listings Page
![Job Listings](./assets/jobsection.png)

### Job Details
![Job Details](./assets/jobdetailpage.png)

### Create Job with AI Description
![Create Job](./assets/jobeditpage.png)

### User Authentication
![Authentication](./assets/login.png)

### User Dashboard
![Dashboard](./assets/register.png)

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (for running PostgreSQL)
- [OpenRouter API key](https://openrouter.ai/) for job description generation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database using Docker:
   ```bash
   docker run --name postgres-jobsdb \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=mydb \
     -p 5432:5432 \
     -d postgres
   ```

4. Create a `.env` file in the Backend directory:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
   JWT_SECRET="your-secure-jwt-secret-key"
   PORT=8000
   OPENROUTER_API_KEY="your-openrouter-api-key"
   ```

5. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. Start the backend server:
   ```bash
   npm run start:dev
   ```

The backend API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`.

## API Documentation

### Authentication Endpoints

- `POST /auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }
  ```

- `POST /auth/login` - Login and get JWT token
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Job Endpoints

- `GET /jobs` - List all jobs
- `GET /jobs/:id` - Get a single job post
- `POST /jobs` - Create a new job post (requires authentication)
  ```json
  {
    "title": "Software Engineer",
    "description": "Job description here...",
    "location": "Remote",
    "autoGenerateDescription": true
  }
  ```
- `PUT /jobs/:id` - Update an existing job (requires authentication)
- `DELETE /jobs/:id` - Delete a job post (requires authentication)
- `POST /jobs/generate-description` - Generate a job description using AI (requires authentication)
  ```json
  {
    "title": "Software Engineer"
  }
  ```

## AI-Powered Job Description Generation

The application uses OpenRouter's API to generate professional job descriptions based on job titles. This feature is available:

1. When creating a new job post by setting `autoGenerateDescription: true`
2. By using the dedicated endpoint `POST /jobs/generate-description`

The AI service uses advanced language models to create tailored job descriptions that include responsibilities, qualifications, and required skills.

## Authentication and Authorization

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

To get a token:
1. Register a user with `POST /auth/register`
2. Login with `POST /auth/login` to receive a JWT token

## Database Schema

### Job Model
```prisma
model Job {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  location    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```