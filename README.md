# URL Shortener

A simple URL shortening service built with TypeScript, Express, and Drizzle ORM with PostgreSQL.

## Features

- Create shortened URLs
- Redirect to original URLs
- Track click counts for each shortened URL
- RESTful API

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Drizzle ORM

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shortener
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials.

5. Create the PostgreSQL database:

```bash
createdb shortener
```

6. Generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### Running the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## API Documentation

The application includes comprehensive API documentation using **Swagger UI**. Once the application is running, you can access the documentation at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

This interactive documentation allows you to:

- View all available API endpoints
- Understand request parameters and response formats
- Test API endpoints directly from the browser
- See examples of successful requests and responses

The Swagger UI provides a convenient way to explore and interact with the **URL Shortener API** without needing additional tools.
