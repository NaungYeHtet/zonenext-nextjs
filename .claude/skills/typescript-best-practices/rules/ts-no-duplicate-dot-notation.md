---
title: Avoid Duplicate Dot Notation
impact: CRITICAL
impactDescription: Reduces mistakes and keeps code concise
tags: typescript, readability, style
---

## Avoid Duplicate Dot Notation

Avoid repeating `obj.a`, `obj.b`, ... across a function. Use object destructuring so you only reference the source once.

**Incorrect (repeats the same chain):**

```typescript
logger.info('request', { userId: req.user.id, orgId: req.user.orgId })
await service.run(req.user.id, req.user.orgId)
```

**Correct (destructure once):**

```typescript
const {
  user: { id: userId, orgId },
} = req

logger.info('request', { userId, orgId })
await service.run(userId, orgId)
```
