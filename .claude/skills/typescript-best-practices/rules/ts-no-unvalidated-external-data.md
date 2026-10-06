---
title: Validate External Data Before Typing It
impact: CRITICAL
impactDescription: Prevents untrusted inputs from being treated as trusted application objects
tags: typescript, validation, api, safety
---

## Validate External Data Before Typing It

Do not cast external data directly into application types.

This applies to values from:
- `JSON.parse()`
- HTTP responses from third-party systems
- localStorage / sessionStorage
- request bodies and query strings
- message queues and event payloads

**Incorrect (trusts unvalidated data):**

```typescript
const payload = JSON.parse(input) as CreateTaskDto
```

**Correct (treat as `unknown`, then validate):**

```typescript
const payload: unknown = JSON.parse(input)

if (!isCreateTaskDto(payload)) {
  throw new Error('Invalid task payload')
}
```

Prefer schema validation or a trustworthy type guard at the boundary. Do not let untrusted data acquire a trusted app type without proof.