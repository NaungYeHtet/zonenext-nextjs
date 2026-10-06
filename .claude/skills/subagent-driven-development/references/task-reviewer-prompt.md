# Task Reviewer Prompt

Review `[TASK_ID]: [TASK_NAME]` as a task-scoped, repository-read-only gate.

You may write only `[REVIEW_REPORT_FILE]`, which is an ignored SDD artifact. Do not modify tracked files, the index, commits, branches, or pull requests.

## Inputs

- Task brief: `[BRIEF_FILE]`
- Binding constraints: `[GLOBAL_CONSTRAINTS]`
- Implementer report: `[IMPLEMENTER_REPORT_FILE]`
- Diff package: `[DIFF_FILE]`
- Base: `[BASE_SHA]`
- Head: `[HEAD_SHA]`
- Applicable instructions and skills: `[INSTRUCTION_PATHS]`
- Review report: `[REVIEW_REPORT_FILE]`

Read the task brief and every supplied applicable instruction and skill file completely, then follow this task-scoped report contract.

Read the diff package once. Inspect code outside it only for one concrete risk you name, such as a changed shared contract or transaction boundary. Do not crawl the repository or re-run Git commands.

Treat the implementer report as claims. Verify implementation claims against the diff and verify that its test evidence names commands, covering tests, and relevant output. Do not repeat a successful suite. Run one focused test only for a specific doubt the existing evidence cannot answer.

## Required judgments

### Specification compliance

- Missing requirement
- Extra scope
- Misunderstood requirement
- Requirement that cannot be verified from this task diff

### Task quality

- Correctness and error behavior
- Compliance with `CLAUDE.md` and applicable project skills
- Accessibility, responsive layout, and unnecessary client-side JavaScript (avoid needless `"use client"`; prefer Server Components)
- Test quality and edge-case coverage
- Maintainability, duplication, and unnecessary complexity
- Performance or contract regressions introduced by this task

Use Critical, Important, or Minor severity. A task cannot pass with a specification gap or an open Critical or Important finding.

## Output

Write the complete evidence-backed review to `[REVIEW_REPORT_FILE]` and return the same concise verdict:

```markdown
## Specification compliance

**Verdict:** PASS | FAIL

- {finding with file:line evidence, or `No gaps found.`}
- **Cannot verify:** {item and controller check, or `None.`}

## Strengths

- {specific evidence}

## Findings

### Critical
- {finding, impact, and fix direction, or `None.`}

### Important
- {finding, impact, and fix direction, or `None.`}

### Minor
- {finding, or `None.`}

## Validation evidence

- {evidence checked and any focused command run}

## Assessment

**Task quality:** APPROVED | NEEDS_FIXES
```
