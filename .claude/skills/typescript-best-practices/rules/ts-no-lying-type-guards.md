---
title: Type Guards Must Prove What They Claim
impact: CRITICAL
impactDescription: Prevents false narrowing and downstream runtime failures
tags: typescript, safety, type-guards
---

## Type Guards Must Prove What They Claim

Custom type guards must validate enough structure to justify the narrowed type.

Do not write guards that check one field and claim the entire object matches a much richer type.

**Incorrect (guard checks too little):**

```typescript
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null
}
```

**Correct (guard verifies the fields it relies on):**

```typescript
function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false

  const id = Reflect.get(value, 'id')
  const email = Reflect.get(value, 'email')

  return typeof id === 'string' && typeof email === 'string'
}
```

If the full type is too large to validate safely, do not pretend to narrow to it. Narrow to a smaller validated shape instead.