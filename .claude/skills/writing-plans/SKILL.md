---
name: writing-plans
description: Create self-contained implementation plans for this Next.js (App Router) site from specifications, GitHub issues, or multi-step requirements before changing code. Use when a fresh worker needs exact file, interface, test, command, and commit instructions; do not use for implementation, pull-request review, or GitHub workflow mutations.
---

# Writing Plans

Write implementation plans for a skilled engineer with no repository or domain context. Keep tasks independently testable, steps bite-sized, scope minimal, and commits frequent.

Announce: `I'm using the writing-plans skill to create the implementation plan.`

This skill adapts `obra/superpowers` at commit
`44c9b2d6e889982ac18c27d05a19fefe335194e1`. See `LICENSE` for the upstream license.

## Prepare

1. Read root `CLAUDE.md` and any nested `CLAUDE.md` that applies to prospective files.
2. Read `package.json` scripts, `next.config.mjs`, `tsconfig.json`, `middleware.ts`, and `i18nConfig.ts` before prescribing commands or configuration. Confirm Next.js 14 App Router APIs against current docs instead of relying on memory.
3. Read applicable domain skills before prescribing implementation patterns.
4. Inspect existing components, utilities, packages, tests, fixtures, and neighboring implementations.
5. Resolve discoverable requirements from the repository. Record only unavoidable assumptions.

Do not edit production or test code while planning.

## Choose scope and location

Split independent subsystems into separate plans when each can produce working, testable software on its own.

Save plans under `plan/` unless the user specifies another location. Use:

`plan/<purpose>-<component>-<version>.md`

Use `feature`, `bugfix`, `upgrade`, `refactor`, `data`, `infrastructure`, `process`, `architecture`, or `design` when applicable.

## Map files before tasks

List every file to create, modify, move, delete, generate, or test and give it one responsibility. Prefer established repository structure and reuse. Files that change together should live together; split by responsibility rather than technical layer when the repository's intended architecture supports it.

Define interfaces between tasks before defining steps. A task's worker receives only its task brief, so name consumed and produced symbols, signatures, configuration keys, routes, content-collection schemas, and artifacts exactly.

## Right-size tasks and steps

A task is the smallest independently testable deliverable worth a fresh review gate. Fold setup, configuration, scaffolding, and documentation into the task whose deliverable requires them.

Each checkbox step should be one concrete action that normally takes a few minutes:

- add or update one focused test behavior;
- run one command and verify the expected failure;
- implement one precisely described behavior or mechanical change;
- run one command and verify the expected success;
- inspect the task diff for unnecessary complexity;
- commit the task's exact files.

Do not split work into artificial setup tasks that cannot be reviewed independently.

## Required plan header

Every plan starts with this structure:

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED SKILL: Use `subagent-driven-development` to execute this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [One sentence describing the outcome]

**Architecture:** [Two or three sentences describing boundaries, data flow, and migration strategy]

**Tech Stack:** [Relevant frameworks, packages, storage, and test tools]

## Global Constraints

- [Exact project-wide requirement or non-goal]

## Requirements Sources

- `[exact/specification/or/issue]`

## File Structure

- Create: `[exact/path]` — [single responsibility]
- Modify: `[exact/path]` — [single responsibility]
- Test: `[exact/path]` — [behavior covered]

---
```

Replace every bracketed field. Do not retain template placeholders.

## Required task structure

Use upstream-compatible headings and sequential numbering:

```markdown
### Task 1: [Independently testable deliverable]

**Files:**
- Create: `[exact/path]`
- Modify: `[exact/path]`
- Test: `[exact/path]`

**Interfaces:**
- Consumes: [exact existing or earlier-task interface]
- Produces: [exact interface later tasks use]

**Applicable instructions:**
- `CLAUDE.md`
- `[applicable/skill/SKILL.md]`

- [ ] **Step 1: [Single action]**

  Instruction: [Exact behavior, symbol, value, edge case, or file operation.]

  Validate: `[exact package-script command, e.g. npx tsc --noEmit, npm run lint, npm run build]`

  Expected: [Specific failure or success evidence.]

- [ ] **Step N: Commit**

  Commit only this task's files with `[conventional commit subject]`.
```

Repeat the full context in every task. Never write “same as Task N”; a worker may read tasks out of order.

## Prefer implementation instructions over code

Do not include concrete production code, pseudocode, patch fragments, or test implementation snippets. Describe implementation precisely enough that the worker does not invent requirements:

- name exact files, symbols, signatures, props, content-collection fields, configuration keys, routes, and error behavior;
- state test setup, inputs, assertions, and edge cases in prose;
- give exact package-script commands and expected RED/GREEN evidence;
- state mechanical move maps and import rules explicitly;
- state values and formats copied from the requirement source.

Shell commands and conventional commit subjects are required execution instructions, not implementation snippets.

## Plan quality rules

- Preserve DRY, YAGNI, TDD, and repository-established patterns.
- Use RED/GREEN steps when behavior changes. For pure moves or documentation, record a passing baseline and require unchanged validation instead.
- Verify package scripts and CLI flags (`--help`); never guess them.
- Define failure behavior and edge cases.
- Keep focused checks inside tasks and repository-level validation at the end.
- Separate locally executable checks from deployment or production verification.
- Do not introduce dependencies, migrations, generated outputs, abstractions, or documentation the requirements do not need.
- Never use `TBD`, `TODO`, “implement later”, “fill in details”, “similar to”, unspecified “appropriate” handling, or “write tests” without exact behaviors and assertions.

## Self-review

After writing the plan, review it yourself without dispatching a subagent:

1. Map every source requirement and non-goal to at least one task and validation step.
2. Verify every `### Task N` has exact files, interfaces, applicable instructions, ordered steps, commands, expected evidence, and a task commit.
3. Verify referenced files, symbols, targets, and flags exist or an earlier task creates them.
4. Search for placeholders and ambiguous instructions and replace them.
5. Check cross-task names and interfaces for consistency.
6. Confirm the plan contains instructions rather than implementation code.
7. Run `git diff --check` for the plan change.

For an explicitly requested independent plan review, the root controller reads `references/plan-reviewer-prompt.md`, fills every placeholder, and dispatches one fresh read-only general-purpose reviewer. The prompt is not a skill and never creates or reviews a pull request.

## Handoff

Report the saved path and concise coverage/validation results. Offer one execution path:

`Use subagent-driven-development to execute the approved plan task by task.`

When another workflow invokes this skill, return the plan path and validation result to the caller.
