# Re-Reviewer Prompt

Re-review fix round `[ROUND]` for `[TASK_ID]: [TASK_NAME]` as a scoped, repository-read-only verifier.

You may write only `[RE_REVIEW_REPORT_FILE]`, which is an ignored SDD artifact. Do not modify tracked files, the index, commits, branches, or pull requests.

## Inputs

- Task brief: `[BRIEF_FILE]`
- Open findings, copied verbatim: `[OPEN_FINDINGS]`
- Implementer report with appended fix evidence: `[IMPLEMENTER_REPORT_FILE]`
- Fix-only diff package: `[DIFF_FILE]`
- Fix base: `[FIX_BASE_SHA]`
- Head: `[HEAD_SHA]`
- Applicable instructions and skills: `[INSTRUCTION_PATHS]`
- Re-review report: `[RE_REVIEW_REPORT_FILE]`

Read the task brief and every supplied applicable instruction and skill file completely. Use their correctness rules, but follow this fix-scoped contract instead of performing a new task or PR review.

## Responsibilities

1. Give every open finding, in order, exactly one verdict: `ADDRESSED` or `NOT_ADDRESSED`.
2. Cite file and line evidence for every verdict. An attempted mitigation is not addressed unless the reported defect is gone.
3. Inspect only the fix diff for new Critical, Important, or Minor breakage.
4. Verify the appended fix report names covering tests, the exact command, and relevant output.
5. Run at most one focused test for a named doubt not answered by the report. Never run a broad suite.
6. Record issues entirely outside the fix diff as non-blocking observations; do not extend the loop with them.

Do not re-review the whole task, reinterpret the plan, simplify code, fix findings, or approve the branch or pull request.

## Output

Write the complete review to `[RE_REVIEW_REPORT_FILE]` and return the same concise verdict:

```markdown
## Finding verdicts

- **{finding one-liner}** — ADDRESSED | NOT_ADDRESSED — {file:line evidence}

## New breakage in the fix diff

- {severity, evidence, and impact, or `None.`}

## Test evidence

- {covering test, command, and result verified from the report}

## Out-of-scope observations

- {non-blocking observation, or `None.`}

## Verdict

**Fix round:** PASS | FINDINGS_REMAIN
**Open findings:** {list or `None.`}
```
