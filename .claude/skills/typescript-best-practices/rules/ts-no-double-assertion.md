---
title: Avoid Double Assertions
impact: CRITICAL
impactDescription: Prevents forced type compatibility that bypasses compiler checks
tags: typescript, safety, assertions
---

## Avoid Double Assertions

Do not chain assertions like `as unknown as T` to force a value into a target type.

This pattern bypasses TypeScript's compatibility checks instead of proving correctness. If the source and target types do not align, fix the modeling, narrow the value, or validate the data at runtime.

**Incorrect (forces compatibility through `unknown`):**

```typescript
const user = payload as unknown as User
```

**Correct (narrow or validate first):**

```typescript
if (!isUser(payload)) {
  throw new Error('Invalid user payload')
}

const user = payload
```

Use assertions only at well-justified interop boundaries, and avoid double assertions entirely in normal application code.