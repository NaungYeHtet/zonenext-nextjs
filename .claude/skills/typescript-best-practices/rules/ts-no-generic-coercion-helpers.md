---
title: Avoid Generic Coercion Helpers
impact: CRITICAL
impactDescription: Prevents unsafe casting from being centralized and reused as a false abstraction
tags: typescript, safety, abstractions
---

## Avoid Generic Coercion Helpers

Do not create helpers like `coerce<T>()`, `cast<T>()`, or `unsafeAs<T>()` that convert arbitrary values into arbitrary types without validation.

These helpers hide unsafe casts behind a reusable abstraction and make review harder.

**Incorrect (centralized unsafe cast):**

```typescript
function coerce<T>(value: unknown): T {
  return value as T
}
```

**Correct (validate for the specific target shape):**

```typescript
function parseUser(value: unknown): User {
  if (!isUser(value)) {
    throw new Error('Invalid user value')
  }

  return value
}
```

Use specific validation and parsing functions for specific types. Do not abstract away unsoundness with generics.