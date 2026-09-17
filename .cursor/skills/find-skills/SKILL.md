---
name: find-skills
description: >-
  Guides discovery and installation of agent skills from the open ecosystem
  (skills.sh, Skills CLI). Use when the user asks how to do something that
  might have an existing skill, searches for a skill, asks if a capability
  exists as a skill, or wants to extend agent capabilities with installable
  workflows or tools.
---

# Find Skills

Helps discover and install skills from the open agent skills ecosystem.

## When to Use This Skill

Use when the user:

- Asks "how do I do X" where X might match a common packaged skill
- Says "find a skill for X" or "is there a skill for X"
- Asks "can you do X" where X is a specialized capability
- Wants to extend agent capabilities or find templates and workflows
- Names a domain (design, testing, deployment, etc.) and wants packaged help

## Skills CLI

The Skills CLI (`npx skills`) is the package manager for the open agent skills
ecosystem. Skills add specialized knowledge, workflows, and tools.

**Commands:**

- `npx skills find [query]` — Search by keyword or interactively
- `npx skills add <package>` — Install from GitHub or other sources
- `npx skills check` — Check for updates
- `npx skills update` — Update installed skills

**Browse:** https://skills.sh/

## Workflow

### 1. Clarify the need

Identify:

1. Domain (e.g. React, testing, deployment)
2. Task (e.g. writing tests, reviewing PRs)
3. Whether a packaged skill is plausible

### 2. Check the leaderboard first

Open [skills.sh leaderboard](https://skills.sh/) before CLI search. Popular,
well-used skills surface there.

Examples of widely used sources (verify current listings on the site):

- `vercel-labs/agent-skills` — React, Next.js, web-oriented skills
- `anthropics/skills` — Design, documents, and related workflows

### 3. Search

If the leaderboard does not answer the need, run:

```bash
npx skills find [query]
```

Examples:

- React performance → `npx skills find react performance`
- PR reviews → `npx skills find pr review`
- Changelogs → `npx skills find changelog`

### 4. Verify before recommending

Do not recommend from raw search hits alone. Prefer:

1. **Install count** — Favor higher adoption (e.g. 1K+); be cautious under ~100
2. **Source** — Official or well-known orgs over unknown authors
3. **Repository signals** — Review the GitHub repo; very low activity warrants
   extra scrutiny

### 5. Present options

For each good match, give:

1. Skill name and purpose
2. Install count and source (when available)
3. Install command
4. Link on skills.sh

Example:

```text
The "react-best-practices" skill covers React and Next.js performance
patterns from Vercel Engineering. (~185K installs)

Install:
npx skills add vercel-labs/agent-skills@react-best-practices

More: https://skills.sh/vercel-labs/agent-skills/react-best-practices
```

### 6. Install (optional)

If the user wants installation:

```bash
npx skills add <owner/repo@skill> -g -y
```

`-g` installs globally (user-level); `-y` skips confirmation prompts.

## Search hints by area

| Area            | Example queries                          |
| --------------- | ---------------------------------------- |
| Web development | react, nextjs, typescript, tailwind      |
| Testing         | jest, playwright, e2e                    |
| DevOps          | docker, kubernetes, ci-cd                |
| Documentation   | readme, changelog, api-docs              |
| Code quality    | review, lint, refactor, best-practices   |
| Design          | ui, ux, accessibility                    |
| Productivity    | workflow, automation, git                |

**Tips:** Use specific phrases ("react testing" not only "testing"). Try
synonyms ("deploy" vs "deployment"). Check popular collections on skills.sh.

## When nothing matches

1. Say no strong match was found
2. Offer to help with general agent capabilities
3. Mention creating a skill: `npx skills init my-skill-name`

Example:

```text
I did not find a strong skill match for "xyz". I can still walk through it
directly. If you repeat this often, consider:
npx skills init my-xyz-skill
```
