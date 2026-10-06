# API Recipe 🔥

> **Webhook Inspector API** - Capture, inspect, and debug webhook requests in real-time

[![Node.js](https://img.shields.io/badge/Node.js-20.11.1+-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Fastify](https://img.shields.io/badge/Fastify-5.12.5-000000?style=flat-square&logo=fastify)](https://www.fastify.io)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running Locally](#running-locally)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**API Recipe** is a robust webhook inspection service built with Fastify and TypeScript. It provides a modern, type-safe API for capturing and analyzing webhook requests with comprehensive documentation via Swagger.

### Key Features

- ✅ **Type-Safe API** - Built with TypeScript and Zod validation
- 📚 **Auto-Generated Docs** - Interactive API documentation with Scalar
- 🚀 **High Performance** - Built on Fastify framework
- 🔄 **CORS Enabled** - Support for cross-origin requests
- 🗄️ **PostgreSQL** - Persistent data storage with Docker
- 💾 **Redis Cache** - In-memory caching layer with Docker
- 📝 **Code Formatting** - Biome for consistent code style

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         API Recipe (Fastify)            │
│  - Type-safe routes with Zod            │
│  - Swagger/Scalar documentation         │
│  - CORS enabled                         │
└──────────┬──────────────────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌─────────┐
│ PostgreSQL│ │  Redis  │
│ (Data)  │ │ (Cache) │
└─────────┘  └─────────┘
```

### Technology Stack

- **Runtime**: Node.js 20.11.1+
- **Language**: TypeScript 7.0.2
- **Framework**: Fastify 5.12.5
- **Validation**: Zod 4.6.5
- **Database**: PostgreSQL (Docker)
- **Cache**: Redis (Docker)
- **API Docs**: Swagger + Scalar
- **Code Quality**: Biome 2.5.15
- **Package Manager**: pnpm 11.11.0+

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.11.1 or higher ([Download](https://nodejs.org))
- **pnpm**: v11.11.0 or higher ([Install Guide](https://pnpm.io/installation))
- **Docker & Docker Compose**: For containerized development ([Download](https://www.docker.com/products/docker-desktop))
- **Git**: For version control ([Download](https://git-scm.com))

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd api-recipe
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will install all required dependencies specified in `package.json` using pnpm's fast and efficient package management.

## ⚙️ Environment Setup

### Create `.env` File

Create a `.env` file in the project root with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3333
HOST=0.0.0.0

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=docker
DB_PASSWORD=docker
DB_NAME=polls

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Environment Variables Explanation

| Variable | Purpose | Default |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | API server port | `3333` |
| `HOST` | Server host binding | `0.0.0.0` |
| `DB_HOST` | PostgreSQL hostname | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL username | `docker` |
| `DB_PASSWORD` | PostgreSQL password | `docker` |
| `DB_NAME` | PostgreSQL database name | `polls` |
| `REDIS_HOST` | Redis hostname | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |

## 💻 Running Locally

### Development Mode

Start the development server with hot-reload:

```bash
pnpm run dev
```

The API will be available at `http://localhost:3333`

**Output:**
```
🔥 http server running
📚 Docs available at http://localhost:3333/docs
```

### Access the API Documentation

Navigate to:
- **Interactive Docs**: http://localhost:3333/docs (Scalar)
- **Swagger JSON**: http://localhost:3333/documentation

## 🐳 Docker Setup

### Starting Containers

Ensure Docker Desktop is running, then:

```bash
docker-compose up -d
```

This will start:
- **PostgreSQL** on `localhost:5432` (container: `api_recipe_postgres`)
- **Redis** on `localhost:6379` (container: `api_recipe_redis`)

### Verify Containers are Running

```bash
docker-compose ps
```

Expected output:
```
NAME                    STATUS
api_recipe_postgres     Up (healthy)
api_recipe_redis        Up (healthy)
```

### Stopping Containers

```bash
docker-compose down
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Database Access

Connect to PostgreSQL directly:

```bash
docker-compose exec postgres psql -U docker -d polls
```

### Redis Access

Connect to Redis:

```bash
docker-compose exec redis redis-cli
```

## 📁 Project Structure

```
api-recipe/
├── src/
│   ├── server.ts                 # Main server entry point
│   ├── routes.ts                 # Route registration hub
│   ├── types.ts                  # TypeScript type definitions
│   │
│   ├── routes/                   # Endpoints by feature
│   │   ├── auth.ts
│   │   ├── recipes.ts
│   │   ├── ingredients.ts
│   │   └── shopping-lists.ts
│   │
│   ├── schemas/                  # Zod validation schemas
│   │   ├── auth.schema.ts
│   │   ├── recipe.schema.ts
│   │   ├── ingredient.schema.ts
│   │   └── shopping-list.schema.ts
│   │
│   ├── repositories/             # Data access layer
│   │   ├── user.repository.ts
│   │   ├── recipe.repository.ts
│   │   ├── ingredient.repository.ts
│   │   └── shopping-list.repository.ts
│   │
│   ├── services/                 # Business logic
│   │   ├── auth.service.ts
│   │   ├── recipe.service.ts
│   │   └── shopping-list.service.ts
│   │
│   ├── middleware/               # Auth, logging, error handling
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logging.middleware.ts
│   │
│   ├── errors/                   # Custom error classes
│   │   └── app-error.ts
│   │
│   ├── db/                       # Database configuration
│   │   ├── connection.ts
│   │   └── schema.ts
│   │
│   └── utils/                    # Helper functions
│       ├── jwt.ts
│       ├── hash.ts
│       └── validators.ts
│
├── tests/                        # Test files
│   ├── unit/
│   └── integration/
│
├── docker-compose.yml            # Docker services configuration
├── drizzle.config.ts             # ORM configuration
├── tsconfig.json                 # TypeScript configuration
├── biome.json                    # Code formatter configuration
├── package.json                  # Project dependencies
├── pnpm-lock.yaml                # Dependency lock file
├── pnpm-workspace.yaml           # Workspace configuration
├── .env.example                  # Environment template
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── node_modules/                 # Dependencies (not in git)
```

### Architecture Pattern: Clean Architecture

This project follows **Clean Architecture** principles:

- **Routes Layer**: HTTP handlers (Fastify)
- **Schemas Layer**: Input validation (Zod)
- **Services Layer**: Business logic (independent of HTTP)
- **Repositories Layer**: Data access abstraction
- **Middleware Layer**: Cross-cutting concerns (auth, logging)

**Benefit**: Easy to test, maintain, and scale. If you switch databases, only repositories change.

### Directory Conventions

| Directory | Purpose | Naming |
|-----------|---------|--------|
| `routes/` | HTTP endpoints by feature | `{feature}.ts` |
| `schemas/` | Zod validation schemas | `{entity}.schema.ts` |
| `services/` | Business logic | `{feature}.service.ts` |
| `repositories/` | Database queries | `{entity}.repository.ts` |
| `middleware/` | Request handlers | `{purpose}.middleware.ts` |
| `errors/` | Custom errors | `{error-type}.ts` |
| `db/` | Database config | N/A |
| `utils/` | Helper functions | `{utility}.ts` |
| `types/` | TypeScript types | N/A |
| `tests/` | Test files | `{feature}.test.ts` |

## 📜 Available Scripts

```bash
# Development with hot-reload
pnpm run dev

# Production build and start
pnpm run start

# Format code with Biome
pnpm run format

# Check code formatting without changes
pnpm run format --check
```

### Script Descriptions

| Script | Purpose | Usage |
|--------|---------|-------|
| `pnpm run dev` | Start dev server with file watching | Development |
| `pnpm run start` | Start production server | Production |
| `pnpm run format` | Auto-format all files | Before commit |

## 📚 API Documentation

### Auto-Generated Swagger Docs

The API includes auto-generated documentation powered by Swagger and Scalar:

- **URL**: http://localhost:3333/docs
- **Format**: OpenAPI 3.0.0
- **Features**: Interactive API testing, request/response examples

### API Endpoints Structure

Endpoints are organized by feature:

```
POST   /auth/register           # User registration
POST   /auth/login              # User login
POST   /auth/refresh            # Refresh JWT token

GET    /recipes                 # List recipes (paginated)
GET    /recipes/:id             # Get recipe details
POST   /recipes                 # Create recipe
PUT    /recipes/:id             # Update recipe
DELETE /recipes/:id             # Delete recipe

GET    /ingredients             # List ingredients
POST   /ingredients             # Create ingredient
DELETE /ingredients/:id         # Delete ingredient

GET    /shopping-lists          # List user's shopping lists
GET    /shopping-lists/:id      # Get shopping list details
POST   /shopping-lists          # Create shopping list
PUT    /shopping-lists/:id      # Update shopping list
DELETE /shopping-lists/:id      # Delete shopping list
```

### Example: Create Recipe

**Request:**
```bash
curl -X POST http://localhost:3333/recipes \
  -H "Authorization: Bearer <jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pasta Carbonara",
    "description": "Classic Italian pasta",
    "prepTimeMinutes": 20,
    "servings": 4,
    "ingredients": [1, 2, 3]
  }'
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "name": "Pasta Carbonara",
  "description": "Classic Italian pasta",
  "prepTimeMinutes": 20,
  "servings": 4,
  "createdAt": "2024-10-06T16:30:00Z",
  "updatedAt": "2024-10-06T16:30:00Z"
}
```

### CORS Configuration

CORS is enabled for:
- **Origins**: All (`origin: true`)
- **Methods**: GET, POST, PUT, PATCH, DELETE, OPTIONS
- **Credentials**: Disabled by default

To enable credentials:
```typescript
// src/server.ts
credentials: true  // Uncomment this line
```

### Authentication: JWT

JWT (JSON Web Tokens) is used for stateless authentication:

**Token Lifecycle:**
```
1. User registers/logs in
2. Server generates JWT token (valid for 7 days)
3. User includes token in Authorization header
4. Middleware verifies token on protected routes
5. Token expires → User must login again
```

**Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗄️ Database

### PostgreSQL

- **Host**: `localhost`
- **Port**: `5432`
- **User**: `docker`
- **Password**: `docker`
- **Database**: `polls`

### Redis

- **Host**: `localhost`
- **Port**: `6379`
- **Auth**: None (development only)

### Database Health Checks

Both services include health checks:

```yaml
# PostgreSQL
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U docker"]
  
# Redis
healthcheck:
  test: ["CMD", "redis-cli", "ping"]
```

## 🤝 Contributing

### Code Quality Standards

1. **Type Safety**: Always use TypeScript types, avoid `any`
2. **Validation**: Use Zod schemas for all input validation
3. **Formatting**: Run `pnpm run format` before committing
4. **Error Handling**: Always catch and handle errors explicitly
5. **Documentation**: Add JSDoc comments for complex functions
6. **Testing**: Write tests for new features
7. **Security**: Follow OWASP Top 10 guidelines

### Development Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make your changes and test locally:
   ```bash
   pnpm run dev
   pnpm test
   ```

3. Format code:
   ```bash
   pnpm run format
   ```

4. Commit with clear messages following Conventional Commits:
   ```bash
   git commit -m "feat: add shopping list filtering"
   git commit -m "fix: prevent duplicate ingredients"
   git commit -m "docs: update API documentation"
   ```

5. Push to repository:
   ```bash
   git push -u origin feature/my-feature
   ```

6. Create a Pull Request with:
   - Clear description of changes
   - Link to related issues
   - Checklist of testing steps

### Branch Naming Convention

```
feature/description      # New features
bugfix/description       # Bug fixes
docs/description         # Documentation updates
chore/description        # Maintenance tasks
```

## ✅ Validation & Error Handling

### Input Validation with Zod

All request inputs are validated using Zod schemas:

```typescript
// src/schemas/recipe.schema.ts
import { z } from 'zod'

export const createRecipeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().optional(),
  prepTimeMinutes: z.number().positive('Prep time must be positive').optional(),
  servings: z.number().positive('Servings must be at least 1'),
})
```

### Error Response Format

All errors return consistent JSON:

```json
{
  "status": 400,
  "message": "Name is required",
  "timestamp": "2024-10-06T16:30:00Z"
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Recipe fetched |
| `201` | Created | Recipe created |
| `400` | Bad Request | Missing required field |
| `401` | Unauthorized | Missing JWT token |
| `403` | Forbidden | User not owner of resource |
| `404` | Not Found | Recipe doesn't exist |
| `500` | Server Error | Database connection failed |

## ⚡ Performance Optimization

### Query Optimization

1. **Indexes**: Database queries use indexed columns
   ```sql
   CREATE INDEX idx_recipes_user_id ON recipes(user_id);
   CREATE INDEX idx_ingredients_name ON ingredients(name);
   ```

2. **Pagination**: Large result sets are paginated
   ```bash
   GET /recipes?page=1&limit=20
   ```

3. **Eager Loading**: Prevent N+1 queries with joins
   ```typescript
   // ✅ Good: 1 query with join
   const recipes = await db
     .select()
     .from(recipes)
     .leftJoin(ingredients, ...)
   ```

4. **Caching**: Redis for frequently accessed data
   - Cache recipe list (TTL: 5 minutes)
   - Cache ingredient list (TTL: 1 hour)

### Performance Targets

- API response time: < 100ms (p95)
- Database queries: < 50ms
- Search queries: < 200ms
- Cache hit rate: > 80% for popular endpoints

## 🗺️ Development Phases (Roadmap)

### ✅ Phase 1: MVP (Current)

- [x] Basic Fastify setup
- [x] TypeScript configuration
- [x] Docker services (PostgreSQL, Redis)
- [x] Swagger documentation
- [ ] Authentication (JWT)
- [ ] Database schema
- [ ] CRUD endpoints

### 📋 Phase 2: Core Features

- [ ] Recipe management (create, read, update, delete)
- [ ] Ingredient management
- [ ] Shopping list generation
- [ ] Search and filtering
- [ ] Pagination
- [ ] User profiles
- [ ] Input validation

### 🚀 Phase 3: Advanced Features

- [ ] Image uploads (recipes)
- [ ] Ratings and reviews
- [ ] Favorite recipes
- [ ] Share recipes with other users
- [ ] Recipe recommendations
- [ ] Export shopping list (PDF)
- [ ] CI/CD pipeline (GitHub Actions)

### 🔧 Phase 4: Production Ready

- [ ] Monitoring and alerting (Sentry)
- [ ] Performance monitoring (DataDog)
- [ ] Load testing
- [ ] Security audit (OWASP)
- [ ] Database replication
- [ ] CDN for static assets
- [ ] Rate limiting

## 📚 Resources & Learning

### Official Documentation

- **Fastify**: https://fastify.dev/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Zod**: https://zod.dev
- **PostgreSQL**: https://postgresql.org/docs
- **JWT**: https://jwt.io

### Best Practices

- **REST API Design**: https://restfulapi.net
- **OWASP Top 10**: https://owasp.org/www-project-top-ten
- **12 Factor App**: https://12factor.net
- **Clean Code**: "Clean Code" by Robert C. Martin

### Communities

- **Stack Overflow**: https://stackoverflow.com/questions/tagged/fastify
- **Dev.to**: https://dev.to/search?q=fastify
- **GitHub Discussions**: https://github.com/orgs/fastify/discussions

## 📝 License

This project is licensed under the **ISC License** - see [LICENSE](LICENSE) file for details.

---

## 🆘 Troubleshooting

### Docker daemon not running

```bash
# macOS
open /Applications/Docker.app

# Linux
sudo systemctl start docker
```

### Port already in use

```bash
# Find and kill process on port 3333
lsof -i :3333
kill -9 <PID>
```

### Dependencies issues

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## ✅ Development Checklist

Use this checklist to track your progress through each development phase:

### Phase 1: Setup ✅
- [x] Repository created
- [x] Dependencies installed
- [x] Docker services configured
- [x] TypeScript setup complete
- [x] Environment variables configured

### Phase 2: Architecture 🔄
- [ ] Database schema designed
- [ ] Entity relationships defined
- [ ] API endpoints planned
- [ ] Error handling strategy defined

### Phase 3: Authentication
- [ ] JWT implementation
- [ ] Password hashing (bcrypt)
- [ ] Auth middleware
- [ ] Login/register endpoints
- [ ] Token refresh logic

### Phase 4: Database
- [ ] Migrations created
- [ ] Indexes optimized
- [ ] Connection pooling configured
- [ ] Backup strategy defined

### Phase 5: Validation & Errors
- [ ] Zod schemas created
- [ ] Global error handler implemented
- [ ] Input validation on all endpoints
- [ ] Error responses consistent

### Phase 6: Features
- [ ] CRUD endpoints implemented
- [ ] Business logic in services
- [ ] Repository pattern applied
- [ ] All routes documented

### Phase 7: Testing
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] Test coverage > 80%
- [ ] All tests passing

### Phase 8: Performance
- [ ] Database indexes applied
- [ ] Pagination implemented
- [ ] Caching strategy applied
- [ ] Response time < 100ms

### Phase 9: Security
- [ ] OWASP Top 10 reviewed
- [ ] SQL injection prevented (using ORM)
- [ ] XSS protection enabled
- [ ] CORS properly configured
- [ ] Sensitive data not logged

### Phase 10: Production
- [ ] Environment-specific configs
- [ ] Monitoring setup (Sentry)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Health check endpoint
- [ ] Graceful shutdown implemented
- [ ] Documentation complete

---

## 📞 Support & Questions

For issues, questions, or suggestions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Open a new issue with clear description
4. Include: error message, OS, Node version, steps to reproduce

---

**Built with ❤️ using Fastify and TypeScript**

*Last updated: 2024-10-06*
