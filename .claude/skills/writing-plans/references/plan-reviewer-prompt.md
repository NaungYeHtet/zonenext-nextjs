# Plan Reviewer Prompt

Review `[PLAN_FILE]` as a fresh, repository-read-only implementation-plan gate.

## Inputs

- Repository/worktree: `[WORKTREE]`
- Plan: `[PLAN_FILE]`
- Requirement sources: `[REQUIREMENT_SOURCES]`
- Applicable instructions and skills: `[INSTRUCTION_PATHS]`
- Controller clarifications: `[CLARIFICATIONS]`

Read every requirement source before reading the plan. Build your own requirement and non-goal checklist; do not let the plan redefine its source requirements. Then read root `CLAUDE.md`, every supplied scoped instruction, and every supplied applicable skill completely.

Remain read-only. Do not edit the plan or repository, stage files, create commits or branches, post comments, change labels, push, or create/review a pull request.

## Review gates

### Requirements coverage

- Map every acceptance criterion, behavior, edge case, constraint, and non-goal to one or more plan tasks.
- Treat missing, contradicted, or materially underspecified requirements as blocking.

### Feasibility and sequencing

- Verify referenced current files, symbols, packages, targets, and flags exist.
- Verify new files and interfaces are introduced before another task consumes them.
- Verify task ordering and dependency boundaries are safe.
- Flag invented repository capabilities or assumptions that a worker would have to resolve.

### Approach and scope

- Verify the plan reuses established components, layouts, route segments, i18n locales, utilities, Tailwind tokens, and project scripts where appropriate.
- Reject unnecessary abstractions, dependencies, migrations, generated changes, or unrelated refactors.
- Verify each task is an independently testable deliverable worth a fresh review gate.

### Instruction quality

- Require the Superpowers-compatible header and sequential `### Task N` headings.
- Require exact files, interfaces, applicable instructions, bite-sized checkbox steps, focused commands, expected evidence, and a commit instruction in every task.
- Require precise implementation instructions rather than concrete production/test code, pseudocode, patch fragments, or snippets.
- Require exact test inputs, assertions, edge cases, RED/GREEN evidence where behavior changes, and unchanged-baseline evidence for mechanical work.
- Flag placeholders, “similar to” references, unresolved decisions, and guessed package scripts or CLI flags.

### Repository compliance

- Verify every affected path against the root and any nested `CLAUDE.md` files.
- Verify the plan applies each supplied domain skill without copying generic skill inventories into repository instructions.

## Severity and verdict

- **Critical:** the plan can cause data loss, security failure, incompatible public behavior, or an unrecoverable execution path.
- **Important:** a requirement, interface, task boundary, validation step, or repository rule is wrong or missing and must be corrected before execution.
- **Minor:** a bounded clarity or efficiency improvement that does not block safe execution.

Return this Markdown contract:

```markdown
## Requirements coverage

| Requirement | Status | Tasks | Evidence |
|---|---|---|---|
| [requirement] | COVERED / PARTIAL / MISSING / CONTRADICTED | Task N | [evidence] |

## Strengths

- [specific evidence]

## Findings

### Critical
- [finding, source requirement, plan evidence, and exact correction, or `None.`]

### Important
- [finding, source requirement/rule, plan evidence, and exact correction, or `None.`]

### Minor
- [finding and correction, or `None.`]

## Cannot verify

- [item and required controller check, or `None.`]

## Verdict

**Plan:** APPROVED | NEEDS_REVISION
```

Approve only when every source requirement is covered and no Critical or Important finding remains. Do not approve merely because the plan is detailed.
