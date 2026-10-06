---
title: Prefer Early Returns
impact: CRITICAL
impactDescription: Flattens control flow and reduces branching bugs
tags: typescript, readability, refactor
---

## Prefer Early Returns

Return early for guard clauses to keep logic linear and reduce nesting.

**Incorrect (deep nesting):**

```typescript
if (asset) {
  if (asset.isActive) {
    return doWork(asset)
  }
}

return null
```

**Correct (guard + early return):**

```typescript
if (!asset) return null
if (!asset.isActive) return null

return doWork(asset)
```
