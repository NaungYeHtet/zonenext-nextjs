---
title: Model Nullability Explicitly
impact: CRITICAL
impactDescription: Prevents sentinel-value bugs
tags: typescript, typing, database
---

## Model Nullability Explicitly

If a DB/API field can be missing, model it as `T | null` (or `T | undefined` where appropriate). Avoid encoding nulls as magic strings/numbers.

**Incorrect (sentinel value):**

```typescript
type Asset = { lastSeenAt: string }

const lastSeenAt = row.last_seen_at ?? ''
```

**Correct (explicit nullability):**

```typescript
type Asset = { lastSeenAt: string | null }

const lastSeenAt: string | null = row.last_seen_at
```
