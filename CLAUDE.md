# Project Guidelines

## Architecture

Follow **Clean Architecture** principles:

- **Domain layer**: entities and business logic, no framework dependencies
- **Application layer**: use cases, orchestrates domain logic
- **Infrastructure layer**: database, external services, framework-specific code
- **Interface layer**: controllers, DTOs, request/response mapping

Dependencies point inward — outer layers depend on inner layers, never the reverse.

## SOLID Principles

- **Single Responsibility**: each class/module has one reason to change
- **Open/Closed**: open for extension, closed for modification — prefer composition over inheritance
- **Liskov Substitution**: subtypes must be substitutable for their base types
- **Interface Segregation**: prefer small, focused interfaces over large general ones
- **Dependency Inversion**: depend on abstractions, not concretions — inject dependencies via constructor

## Clean Code

- Names should clearly express intent — avoid abbreviations and generic names like `data`, `info`, `manager`
- Functions do one thing and are small — if it needs a comment to explain what it does, rename or extract it
- Avoid magic numbers and strings — use named constants
- No dead code, commented-out code, or unused imports
- Keep nesting shallow — prefer early returns over deeply nested conditionals
- Boolean parameters are a code smell — use separate methods or option objects

## NestJS Patterns

- Business logic belongs in services, not controllers
- Controllers only handle HTTP concerns: parsing input, calling services, returning responses
- Use DTOs with `class-validator` for all incoming request data
- Use custom exceptions that extend `HttpException` for domain errors
- Use repository pattern to abstract data access — services must not use TypeORM repositories directly
- Keep modules cohesive — each module owns its domain slice

## Testing

- Unit test services and domain logic in isolation using mocks
- Integration test controllers through the NestJS testing module
- Test behaviour, not implementation — test what a unit does, not how

## General

- No `any` types — use explicit types or generics
- Prefer `async/await` over raw promises
- Environment-specific config via environment variables only — no hardcoded config values
- Keep `synchronize: true` only in development; use migrations in production
