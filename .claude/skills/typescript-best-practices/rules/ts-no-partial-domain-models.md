---
title: Avoid Partial Domain Models
impact: CRITICAL
impactDescription: Prevents invalid intermediate states from leaking into business logic
tags: typescript, domain-modeling, safety
---

## Avoid Partial Domain Models

Do not use `Partial<T>` for domain entities, DTOs, or persisted objects unless the function is explicitly modeling patch/update semantics.

`Partial<T>` is often too wide. It permits invalid states that the original model was meant to forbid.

**Incorrect (weakens a domain object):**

```typescript
function processUser(user: Partial<User>) {
  return sendEmail(user.email)
}
```

**Correct (model the actual input shape):**

```typescript
type UserEmailInput = {
  email: string
}

function processUser(input: UserEmailInput) {
  return sendEmail(input.email)
}
```

If the intent is patch/update behavior, model that explicitly with a dedicated update type instead of weakening the primary domain type everywhere.