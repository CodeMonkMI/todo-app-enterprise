# Todo Enterprise

A full-stack TypeScript monorepo application built with Turborepo, featuring a clean architecture pattern and domain-driven design.

## Project Overview

Todo Enterprise is a robust task management system with user authentication, role-based access control, and a modern React frontend.

### Key Features

- User authentication and authorization
- Role-based access control with permission management
- Todo management with CRUD operations
- Modern React frontend with shadcn-ui
- Clean architecture with domain-driven design
- Type-safe development with TypeScript

# Project Structure

## Architecture
The project is organized into multiple packages and apps, each with its own purpose.
![Project Architecture](/docs/images/architecture.png "Todo Enterprise Architecture")

## Apps

- `apps/restapi`: Express.js REST API backend service
- `apps/web`: React frontend application with shadcn-ui and Tailwind CSS

## Packages

- `packages/core`: Domain entities, interfaces, repositories, and use cases
- `packages/database`: Database implementations (Prisma)
- `packages/errors`: Custom error handling utilities
- `packages/eslint-config`: Shared ESLint configurations
- `packages/permission-manger`: Role-based access control system
- `packages/schemas`: Zod validation schemas
- `packages/shared`: Shared utilities
- `packages/typescript-config`: Shared TypeScript configurations

### `packages/core`
Interfaces: 
![Core Interfaces](/docs/images/interfaces.png "Core Interfaces")

Repositories:
![Core Repositories](/docs/images/repository_interface.png "Core Repositories")

Use Cases:
![Core Use Cases](/docs/images/use_cases_list.png "Core Use Cases")

### `packages/database`
Database Design: 
![Database Design](/docs/images/database_design.png "Database Design")

### `packages/permission-manger`
Permission State: 
![Permission State](/docs/images/permission_flow.png "Permission State")


## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0
- PostgreSQL database

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd todo-enterprise
```

2. Install dependencies:
```sh
pnpm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the database connection string and other required variables

4. Set up the database:
```sh
pnpm -F @todo/database prisma:generate
pnpm -F @todo/database prisma:migrate
```

### Development

Start all services in development mode:
```sh
pnpm dev
```

Other useful commands:
```sh
# Build all packages
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format

# Type checking
pnpm check-types
```

## Architecture

The application follows a clean architecture pattern with:

- Domain Layer (`packages/core`)
- Infrastructure Layer (`packages/database`, `packages/shared`)
- Presentation Layer (`apps/restapi`, `apps/web`)

