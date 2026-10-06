---
title: Avoid Type Assertions (as)
impact: CRITICAL
impactDescription: Prevents runtime bugs and type drift
tags: typescript, safety, typing
---

## Avoid Type Assertions (`as`)

Avoid forcing types with `as`. Prefer narrowing, validation, or better modeling so TypeScript can prove correctness.

**Incorrect (forces a type without proof):**

```typescript
const payload = JSON.parse(input) as { userId: string }
doSomething(payload.userId)
```

**Correct (validate/narrow first):**

```typescript
const payload: unknown = JSON.parse(input)

function hasUserId(value: unknown): value is { userId: string } {
  if (typeof value !== 'object' || value === null) return false
  const userId = Reflect.get(value, 'userId')
  return typeof userId === 'string'
}

if (hasUserId(payload)) {
  doSomething(payload.userId)
  return
}

throw new Error('Invalid payload')
```
