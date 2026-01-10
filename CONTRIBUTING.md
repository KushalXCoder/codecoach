# Contributing to CodeCoach

Thank you for your interest in contributing to CodeCoach. This document describes the recommended workflow and expectations for contributors.

**How to contribute**
- **Issues**: Open an issue for bugs or feature requests. Provide steps to reproduce, expected behavior, and relevant logs or screenshots.
- **Discussions/Design**: For larger changes, open an issue or discussion first to propose the approach.

**Branching & PRs**
- **Branch names**: `feature/<short-description>`, `fix/<short-description>`, or `chore/<short>`.
- **PRs**: Open pull requests against `main` (or the default branch). Include a clear description, screenshots (if UI), and testing notes.
- **PR checklist**:
  - Ensure code compiles and tests pass
  - Linting applied and formatting consistent
  - Update relevant docs (README, inline comments)

**Code style**
- The project uses TypeScript and a consistent formatting/linting setup. Follow existing patterns in the codebase.
- Prefer descriptive variable/function names and small, focused functions.

**Commit messages**
- Use conventional, concise commits. Examples:
  - `feat: add problem sync endpoint`
  - `fix(auth): handle token refresh edge-case`
  - `chore: update dependencies`

**Testing**
- Add unit/integration tests for important logic where applicable.
- When adding a feature that affects API routes, include instructions for manual verification in the PR description.

**Review process**
- At least one maintainer must review and approve the PR before merge.
- Address review comments with additional commits; squash or rebase commits as requested by maintainers.

**Local development checklist**
1. Pull latest `main` and create a branch
2. Implement changes and add tests
3. Run `npm run dev` and verify UI/API behavior
4. Run linters and formatters
5. Push branch and open PR with details

**Security / Sensitive data**
- Do not commit secrets or credentials. Use `.env.local` for local values and store secrets in Vercel/hosting environment variables.

**Need help?**
- If you’re unsure about how to implement something, open an issue describing your idea — maintainers will help scope it.

Thank you for helping make CodeCoach better!
