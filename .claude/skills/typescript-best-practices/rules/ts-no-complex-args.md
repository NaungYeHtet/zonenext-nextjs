---
title: No Complex Logic in Function Arguments
impact: CRITICAL
impactDescription: Improves readability and debuggability
tags: typescript, readability, refactor
---

## No Complex Logic in Function Arguments

Do not embed complex logic inside function arguments. Precompute into named variables to improve readability and simplify debugging.

This applies to:
- Ternary expressions with conditions
- Function calls within arguments (e.g., `Object.keys()`, `JSON.stringify()`)
- Chained method calls (e.g., `.trim()`, `.toLowerCase()`)
- Complex boolean logic
- Nested object/array literals with computed values

**Incorrect (simple ternary hidden in call):**

```typescript
await service.updateAsset(
  userId,
  input.force ? 'FORCED' : input.overrideReason?.trim() ?? 'DEFAULT'
)
```

**Correct (extract to variables):**

```typescript
const overrideReason = input.overrideReason?.trim()
const mode = input.force ? 'FORCED' : overrideReason ?? 'DEFAULT'

await service.updateAsset(userId, mode)
```

**Incorrect (complex logic in object literal arguments):**

```typescript
await dao.create({
  name: user.name,
  email: user.email?.toLowerCase() || null,
  params: query && Object.keys(query).length > 0 ? JSON.stringify(query) : null,
  metadata: data ? JSON.stringify(data) : null
})
```

**Correct (extract all complex logic):**

```typescript
const normalizedEmail = user.email?.toLowerCase() || null

const hasQuery = query && Object.keys(query).length > 0
const params = hasQuery ? JSON.stringify(query) : null

const metadata = data ? JSON.stringify(data) : null

await dao.create({
  name: user.name,
  email: normalizedEmail,
  params,
  metadata
})
```
