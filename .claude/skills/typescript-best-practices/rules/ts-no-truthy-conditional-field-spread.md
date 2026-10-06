---
title: Do Not Use Truthiness to Conditionally Copy Typed Fields
impact: CRITICAL
impactDescription: Prevents silent dropping of valid falsy values
tags: typescript, correctness, objects
---

## Do Not Use Truthiness to Conditionally Copy Typed Fields

Do not use truthiness checks when conditionally copying typed object fields if `0`, `false`, or an empty string are valid values.

Truthiness-based spreads are a subtle correctness bug that still compiles cleanly.

**Incorrect (drops valid falsy values):**

```typescript
return {
  ...(request.battery && { battery: request.battery }),
  ...(request.withAsset && { withAsset: request.withAsset })
}
```

**Correct (check for `undefined` or `null` explicitly):**

```typescript
return {
  ...(request.battery !== undefined && { battery: request.battery }),
  ...(request.withAsset !== undefined && { withAsset: request.withAsset })
}
```

Use explicit nullability checks when the type system says a falsy value can still be meaningful.