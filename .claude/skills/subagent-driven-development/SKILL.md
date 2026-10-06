---
name: subagent-driven-development
description: Execute an approved implementation plan in the current session with a fresh implementer per detailed task, task-scoped review, bounded fix and re-review loops, and a final branch review. Use only when the user explicitly asks for plan execution with subagents or selects the subagent-driven workflow; run it from the root controller, not from a child agent.
---

# Subagent-Driven Development

Coordinate implementation without editing code in the controller context.

Announce: `I'm using subagent-driven-development to execute this plan task by task.`

This skill is adapted from `obra/superpowers` at commit
`44c9b2d6e889982ac18c27d05a19fefe335194e1`. See `LICENSE` for the upstream license.

## Controller boundary

Run this workflow only from the root session. Spawn every implementer, reviewer, and fixer directly from the root so one-level subagent configurations remain supported. Never ask a task worker to spawn another worker.

Use a fresh isolated worker context for each new task: dispatch a fresh `general-purpose` subagent (never a `fork`) and pass file paths for context.

The controller may update the plan ledger and dispatch prompts. It must not implement fixes, simplify production code, or commit task changes.

## Preflight

1. Read the plan once and verify it has detailed sequential `### Task N` headings. Accept legacy detailed `TASK-###` headings for already-committed plans.
2. Read root `CLAUDE.md` and any nested `CLAUDE.md` files that apply.
3. Read `package.json` scripts before prescribing validation commands.
4. Inspect `git status`, the current branch, and worktree boundaries. Preserve unrelated user changes.
5. Work on an isolated feature branch or worktree. Do not implement on `main`, `master`, or `develop` without explicit user consent.
6. Run `scripts/sdd-workspace PLAN_FILE` to obtain this plan's ignored scratch directory.
7. Create or resume `<scratch>/progress.md`. Its first line must be:

   ```text
   # SDD ledger — plan: <plan file path>
   ```

8. Trust completed ledger entries and Git history after context compaction. Do not re-dispatch completed tasks.
9. Scan the plan for contradictions and missing dependencies before Task 1. Batch genuine blocking questions for the user.

## Task loop

Execute tasks serially. Never run multiple implementers concurrently in the same worktree.

### 1. Prepare the task

Record the current commit as `BASE`. Run:

```bash
<skill-root>/scripts/task-brief PLAN_FILE 1
```

Use the printed brief path. Define these sibling artifact paths inside the plan scratch directory:

- `task-001-report.md`
- `task-001-review.md`
- `task-001-r<round>-review.md`

Read `references/implementer-prompt.md` completely, fill every placeholder, and dispatch a fresh implementer. Pass only:

- the task brief path;
- the report path;
- the repository/worktree path;
- binding interfaces from completed tasks;
- applicable instruction and skill paths;
- any ambiguity resolution.

Do not paste the whole plan or accumulated task history.

### 2. Handle implementer status

Accept only:

- `DONE`: implementation, focused validation, conditional simplification, commit, and report are complete.
- `DONE_WITH_CONCERNS`: completed with concerns the controller must assess before review.
- `NEEDS_CONTEXT`: provide missing concrete context and resume the same worker.
- `BLOCKED`: change the context, capability, or task decomposition; escalate plan defects to the user.

Verify the report names changed files, commits, tests, commands, relevant output, and self-review results.

### 3. Review the task

Run:

```bash
<skill-root>/scripts/review-package PLAN_FILE BASE HEAD
```

Read `references/task-reviewer-prompt.md` completely, fill every placeholder, and dispatch a fresh reviewer. Give it the brief, implementation report, diff package, binding constraints, applicable skill paths, and task-review report path.

A task passes only when both are true:

- the implementation is specification-compliant;
- code quality is approved with no open Critical or Important findings.

Record Minor findings in the ledger for final-review triage.

### 4. Fix and re-review

For specification gaps and Critical or Important findings:

1. Send the exact findings to the original implementer for rounds 1–3 when the platform can resume it.
2. Use a fresh, more capable implementer for rounds 4–5.
3. Require a focused fix, covering tests, a new commit, and an appended report entry.
4. Record `FIX_BASE`, then generate a fix-only review package from `FIX_BASE` to `HEAD`.
5. Read `references/re-review-prompt.md` completely and dispatch a fresh re-reviewer.

The re-reviewer verdicts every open finding `ADDRESSED` or `NOT ADDRESSED`, checks only the fix diff for new breakage, and records unrelated observations as non-blocking.

Allow at most five fix rounds per task. At the cap:

- park contestable or non-load-bearing findings with a written ruling;
- stop and report `BLOCKED` for real load-bearing defects or plan contradictions.

Never silently discard a finding.

### 5. Complete the task

Append one ledger line:

```text
Task 1: complete (commits <base7>..<head7>, review clean)
```

Or, after capped adjudication:

```text
Task 1: complete (commits <base7>..<head7>, <count> parked)
```

Proceed only after every blocking finding is fixed or adjudicated at the cap.

## Validation policy

- Implementers run focused checks through `package.json` scripts while iterating.
- Implementers do not guess scripts or flags; read `package.json` or run `--help`.
- After tests pass, implementers inspect only their task diff for unnecessary complexity. Invoke `code-simplification` only when it is materially useful, preserve behavior, and re-run focused tests.
- Reviewers do not repeat successful suites. They may run one focused test only for a named doubt not answered by the report.
- After all tasks, run plan-required integration checks plus the project's `npm run build`, `npx tsc --noEmit`, `npm run lint`, and `git diff --check`, unless the plan specifies a stricter repository-approved equivalent.
- Report pre-existing failures separately with evidence; never weaken configuration to obtain a pass.

## Final branch review

After all task reviews and final validation:

1. Generate a review package from the branch merge base to `HEAD`.
2. Dispatch one fresh general-purpose reviewer using `references/task-reviewer-prompt.md` scoped to the whole branch, all applicable domain skills, the plan, final validation evidence, and ledger findings.
3. If the final review has blocking findings, dispatch one fixer with the complete findings list, then one fix-only re-review.
4. Do not start repeated unbounded final-review waves. Escalate unresolved load-bearing findings.
5. Remove only this plan's ignored scratch directory after the final review is clean and no recovery data is needed.
6. Report commits, validation, deferred findings, and the branch state. Create or update a pull request only when the user's request includes that action.

Suggest the user run the built-in `/code-review` on the branch as an independent gate before merging.
