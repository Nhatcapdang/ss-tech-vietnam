# Git Commit Message Suggestion Rule

## Purpose
Analyze git changes and suggest appropriate commit messages following conventional commit standards.

## Action Steps
1. Check git status to identify all modified, added, and deleted files
2. Analyze the scope and nature of changes:
   - **feat**: New features or functionality
   - **fix**: Bug fixes
   - **refactor**: Code restructuring without changing functionality
   - **style**: Formatting, missing semicolons, etc.
   - **docs**: Documentation changes
   - **test**: Adding or modifying tests
   - **chore**: Maintenance tasks, dependency updates
   - **perf**: Performance improvements
   - **ci**: CI/CD configuration changes

3. Examine file contents when needed to understand the context of changes
4. Identify the scope (component, module, or area affected)
5. Generate commit message following this format:

```
<type>(<scope>): <description>

- <detailed change 1>
- <detailed change 2>
- <detailed change 3>
```

## Commit Message Guidelines
- **Type**: Use conventional commit types (feat, fix, refactor, etc.)
- **Scope**: Identify the main area affected (dashboard, auth, api, etc.)
- **Description**: Clear, concise summary in present tense
- **Body**: Bullet points explaining what was changed and why
- **Length**: Keep first line under 72 characters
- **Tone**: Imperative mood ("add" not "added" or "adds")