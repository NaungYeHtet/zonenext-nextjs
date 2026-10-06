---
name: typescript-best-practices
description: Language-level TypeScript safety, correctness, and maintainability rules for this Next.js 14 (App Router) site. Use when writing, reviewing, or refactoring TypeScript in .ts/.tsx files, route handlers, server actions, form schemas, and component props.
license: MIT
metadata:
  version: "1.0.0"
---

# TypeScript Best Practices

TypeScript rules for this Next.js 14 App Router + Tailwind site (strict TS). This skill covers TypeScript safety and code quality; confirm Next.js-specific APIs against current docs.

## When to Apply

Reference these guidelines when:

- Writing/refactoring TypeScript in `app/` and root config (`.ts`, `.tsx`, component props)
- Designing types, form validation schemas (Yup), and data models
- Fixing `tsc --noEmit` / `next build` type errors without weakening types

## Rule Categories by Priority

| Priority | Category             | Impact   | Prefix |
| -------- | -------------------- | -------- | ------ |
| 1        | Safety & Correctness | CRITICAL | `ts-`  |

## Quick Reference

### 1. Safety & Correctness (CRITICAL)

- [ts-no-type-assertions](rules/ts-no-type-assertions.md) - Avoid `as`; fix types at the source (narrow, validate, or model properly)
- [ts-no-lossy-request-builders](rules/ts-no-lossy-request-builders.md) - Do not manually rebuild an already-typed SDK/API request object; pass the contract through directly or map from a narrower local type
- [ts-no-double-assertion](rules/ts-no-double-assertion.md) - Do not chain assertions like `as unknown as T`; prove the type instead of forcing it through
- [ts-no-unvalidated-external-data](rules/ts-no-unvalidated-external-data.md) - Validate external data before treating it as an application type
- [ts-no-lying-type-guards](rules/ts-no-lying-type-guards.md) - Custom type guards must validate enough structure to justify the claimed narrowing
- [ts-no-truthy-conditional-field-spread](rules/ts-no-truthy-conditional-field-spread.md) - Do not use truthiness checks when conditionally copying typed fields; valid falsy values can be dropped silently
- [ts-no-partial-domain-models](rules/ts-no-partial-domain-models.md) - Avoid `Partial<T>` for domain entities unless the function explicitly models patch semantics
- [ts-no-generic-coercion-helpers](rules/ts-no-generic-coercion-helpers.md) - Do not centralize unsafe casting in generic `coerce<T>`-style helpers
- [ts-no-complex-args](rules/ts-no-complex-args.md) - No complex logic inside function arguments; precompute into variables
- [ts-no-duplicate-dot-notation](rules/ts-no-duplicate-dot-notation.md) - Use object destructuring instead of repeating `obj.a`, `obj.b`, ...
- [ts-early-return](rules/ts-early-return.md) - Return early to keep code linear and readable
- [ts-nullable-explicit](rules/ts-nullable-explicit.md) - Use `| null` explicitly for nullable DB/API fields; don’t encode nulls as magic values
