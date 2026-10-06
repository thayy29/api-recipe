# Contributing to API Recipe

Thank you for interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

By participating in this project, you agree to be respectful and constructive. We value:

- **Respect**: Treat all contributors with respect
- **Inclusivity**: Welcome contributors of all backgrounds
- **Professionalism**: Keep discussions focused and professional
- **Collaboration**: Help others and accept constructive feedback

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/api-recipe.git
   cd api-recipe
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Setup environment**
   ```bash
   cp .env.example .env
   # Update .env with your values
   ```

## 💻 Development Setup

### Prerequisites

- Node.js v20.11.1+
- pnpm v11.11.0+
- Docker & Docker Compose
- Git

### Start Development Environment

```bash
# Start Docker services
docker-compose up -d

# Start development server (hot-reload)
pnpm run dev

# View API documentation
# Visit http://localhost:3333/docs
```

### Useful Commands

```bash
# Format code
pnpm run format

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Check types
pnpm type-check

# Lint code
pnpm lint

# View Docker logs
docker-compose logs -f
```

## ✏️ Making Changes

### Architecture Guidelines

This project follows **Clean Architecture**:

```
Routes → Schemas → Services → Repositories → Database
         (Input)  (Logic)    (Data Access)
```

When adding a feature:

1. **Define the schema** (Zod validation)
   ```typescript
   // src/schemas/my-feature.schema.ts
   export const createMyFeatureSchema = z.object({
     name: z.string().min(1),
     // ...
   })
   ```

2. **Create the repository** (data access)
   ```typescript
   // src/repositories/my-feature.repository.ts
   export class MyFeatureRepository {
     async create(data: CreateMyFeatureDTO) {
       // Database query
     }
   }
   ```

3. **Implement the service** (business logic)
   ```typescript
   // src/services/my-feature.service.ts
   export class MyFeatureService {
     async createMyFeature(data: CreateMyFeatureDTO) {
       // Validation
       // Processing
       // Call repository
     }
   }
   ```

4. **Define the route** (API endpoint)
   ```typescript
   // src/routes/my-feature.ts
   export async function myFeatureRoutes(app: FastifyInstance) {
     app.post<{ Body: typeof createMyFeatureSchema }>(
       '/my-features',
       { schema: { body: createMyFeatureSchema } },
       async (request, reply) => {
         // Call service
       }
     )
   }
   ```

### File Naming Conventions

```
TypeScript files: camelCase
├── services/      → featureName.service.ts
├── repositories/  → featureName.repository.ts
├── routes/        → featureName.ts
├── schemas/       → featureName.schema.ts
├── middleware/    → purposeName.middleware.ts
├── errors/        → errorType.ts
└── utils/         → utilityName.ts

Directories: kebab-case
├── src/
├── tests/
├── docker-compose.yml
```

## 🧪 Testing

Write tests for all new features:

### Unit Tests

```typescript
// tests/unit/services/recipe.service.test.ts
import { describe, it, expect } from 'vitest'
import { RecipeService } from '@/services/recipe.service'

describe('RecipeService', () => {
  it('should create a recipe', async () => {
    const recipe = await service.createRecipe({
      name: 'Pasta',
      servings: 4
    })

    expect(recipe).toHaveProperty('id')
    expect(recipe.name).toBe('Pasta')
  })
})
```

### Integration Tests

```typescript
// tests/integration/recipes.test.ts
import { describe, it, expect, beforeAll } from 'vitest'
import { app } from '@/server'

describe('Recipes API', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should list recipes', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/recipes'
    })

    expect(response.statusCode).toBe(200)
  })
})
```

### Test Coverage

- Target: **> 80% coverage**
- Run: `pnpm test:coverage`
- Exclude: configuration files, main entry point

## 📤 Pull Request Process

### Before Submitting

1. **Update your fork with latest changes**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks locally**
   ```bash
   pnpm run format      # Auto-format code
   pnpm test            # Run tests
   pnpm type-check      # Check types
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   git push -u origin feature/your-feature-name
   ```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] No new warnings generated
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests pass locally
```

### Review Process

1. At least one maintainer review required
2. All tests must pass (CI/CD)
3. Code coverage must not decrease
4. Conversations resolved

## 💬 Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Code style (no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Test-related changes
- **chore**: Build/dependencies/CI

### Examples

```bash
# Feature
git commit -m "feat(recipes): add recipe search by ingredients"

# Fix
git commit -m "fix(auth): prevent expired tokens from being used"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Multiple line commit
git commit -m "feat(shopping-list): auto-generate list from recipes

- Extract ingredients from recipes
- Group ingredients by category
- Calculate total quantities"
```

## 🎨 Code Style

### TypeScript

```typescript
// ✅ Good: Explicit types
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ❌ Bad: Using `any`
function calculateTotal(items: any): any {
  return items.reduce((sum: any, item: any) => sum + item.price, 0)
}
```

### Error Handling

```typescript
// ✅ Good: Explicit error handling
try {
  const recipe = await recipeService.getRecipe(id)
  return recipe
} catch (error) {
  if (error instanceof NotFoundError) {
    throw new AppError(404, 'Recipe not found')
  }
  throw error
}

// ❌ Bad: Silently ignoring errors
try {
  return await recipeService.getRecipe(id)
} catch {
  return null
}
```

### Function Documentation

```typescript
/**
 * Calculate shopping list from selected recipes.
 *
 * @param recipeIds - Array of recipe IDs to include
 * @param userId - User ID for ownership
 * @returns Generated shopping list with grouped ingredients
 * @throws NotFoundError if recipe doesn't exist
 * @throws ValidationError if no recipes provided
 *
 * @example
 * const list = await generateShoppingList([1, 2, 3], 'user-1')
 */
async function generateShoppingList(
  recipeIds: number[],
  userId: string
): Promise<ShoppingList> {
  // Implementation
}
```

## 🐛 Reporting Issues

### Bug Reports

Include:

1. **Description**: Clear explanation of the bug
2. **Steps to reproduce**: Exact steps to trigger the bug
3. **Expected behavior**: What should happen
4. **Actual behavior**: What happens instead
5. **Environment**: OS, Node version, pnpm version
6. **Screenshots/logs**: If applicable

### Feature Requests

Include:

1. **Problem**: What problem does it solve?
2. **Solution**: How should it work?
3. **Alternative solutions**: Other approaches considered
4. **Additional context**: Links, references

## 📚 Resources

- [Fastify Documentation](https://fastify.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Thank you for contributing! 🎉
