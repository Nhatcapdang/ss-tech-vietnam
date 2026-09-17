# shadcn CLI reference (summary)

Always invoke via the project package manager, e.g.:

- `npx shadcn@latest …`
- `pnpm dlx shadcn@latest …`
- `bunx --bun shadcn@latest …`

## Commands you will use most

| Command | Purpose |
| ------- | ------- |
| `info` / `info --json` | Project config, paths, installed components |
| `init` | New or existing project; supports `--preset`, `--template`, `--force`, `--reinstall` / `--no-reinstall`, monorepo flags |
| `add` | Add or update components; `--dry-run`, `--diff`, `--overwrite` |
| `docs <names…>` | Print URLs for docs, examples, API |
| `search` | Search registries (`-q` query) |
| `view` | Inspect registry items not yet installed |

## Presets

- **Named:** e.g. `base-nova`, `radix-nova`.
- **Codes:** base62 strings from https://ui.shadcn.com — pass verbatim to
  `init --preset <code>`; do not decode or fetch manually.

## Safety

- Prefer **`--dry-run`** then **`--diff`** before overwriting local edits.
- **`--overwrite`** only with explicit user consent.

For exhaustive flag lists, rely on `shadcn --help` and upstream documentation
linked from `docs`.
