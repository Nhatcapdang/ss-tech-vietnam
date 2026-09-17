---
name: shadcn
description: >-
  Manages shadcn components and projects: adding, searching, fixing, debugging,
  styling, and composing UI. Provides project context, component docs, and usage
  examples. Applies when working with shadcn/ui, component registries, presets,
  --preset codes, or any project with a components.json file. Also triggers for
  shadcn init, create an app with --preset, or switch to --preset.
user-invocable: false
allowed-tools:
  - Bash(npx shadcn@latest *)
  - Bash(pnpm dlx shadcn@latest *)
  - Bash(bunx --bun shadcn@latest *)
---

# shadcn/ui

A framework for building UI, components, and design systems. Components are
added as source code to the user's project via the CLI.

> **IMPORTANT:** Run all CLI commands using the project's package runner:
> `npx shadcn@latest`, `pnpm dlx shadcn@latest`, or `bunx --bun shadcn@latest`
> — based on the project's `packageManager` from `shadcn info` or
> `package.json`. Examples below use `npx shadcn@latest` but substitute the
> correct runner for the project.

## Current Project Context

Run once per task (or when config may have changed) and treat the output as
source of truth:

```bash
npx shadcn@latest info --json
```

Prefer `--json` for machine-readable `aliases`, `components`, `resolvedPaths`,
`base`, `iconLibrary`, `packageManager`, etc.

Use `npx shadcn@latest docs <component>` for documentation and example URLs for
any component.

## Principles

1. **Use existing components first.** Use `npx shadcn@latest search` to check
   registries before writing custom UI. Check community registries too.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls.
   Dashboard = Sidebar + Card + Chart + Table.
3. **Use built-in variants before custom styles.** `variant="outline"`,
   `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw
   values like `bg-blue-500`.

## Critical Rules

These rules are **always enforced**. Details: [rules/styling.md](rules/styling.md),
[rules/forms.md](rules/forms.md), [rules/composition.md](rules/composition.md),
[rules/icons.md](rules/icons.md), [rules/base-vs-radix.md](rules/base-vs-radix.md).

### Styling & Tailwind

- **`className` for layout, not styling.** Never override component colors or
  typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`. For vertical
  stacks, `flex flex-col gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not
  `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`,
  `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal
  ternaries.
- **No manual `z-index` on overlay components.** Dialog, Sheet, Popover, etc.
  handle their own stacking.

### Forms & Inputs

- **Forms use `FieldGroup` + `Field`.** Never use raw `div` with `space-y-*` or
  `grid gap-*` for form layout.
- **`InputGroup` uses `InputGroupInput`/`InputGroupTextarea`.** Never raw
  `Input`/`Textarea` inside `InputGroup`.
- **Buttons inside inputs use `InputGroup` + `InputGroupAddon`.**
- **Option sets (2–7 choices) use `ToggleGroup`.** Don't loop `Button` with
  manual active state.
- **`FieldSet` + `FieldLegend` for grouping related checkboxes/radios.** Don't
  use a `div` with a heading.
- **Field validation uses `data-invalid` + `aria-invalid`.** `data-invalid` on
  `Field`, `aria-invalid` on the control. For disabled: `data-disabled` on
  `Field`, `disabled` on the control.

### Component Structure

- **Items always inside their Group.** `SelectItem` → `SelectGroup`.
  `DropdownMenuItem` → `DropdownMenuGroup`. `CommandItem` → `CommandGroup`.
- **Use `asChild` (radix) or `render` (base) for custom triggers.** Check
  `base` field from `npx shadcn@latest info`. See
  [rules/base-vs-radix.md](rules/base-vs-radix.md).
- **Dialog, Sheet, and Drawer always need a Title.** `DialogTitle`,
  `SheetTitle`, `DrawerTitle` required for accessibility. Use
  `className="sr-only"` if visually hidden.
- **Use full Card composition.** `CardHeader`/`CardTitle`/`CardDescription`/
  `CardContent`/`CardFooter`. Don't dump everything in `CardContent`.
- **Button has no `isPending`/`isLoading`.** Compose with `Spinner` + `data-icon`
  + `disabled`.
- **`TabsTrigger` must be inside `TabsList`.** Never render triggers directly in
  `Tabs`.
- **`Avatar` always needs `AvatarFallback`.** For when the image fails to load.

### Use Components, Not Custom Markup

- **Use existing components before custom markup.** Check if a component exists
  before writing a styled `div`.
- **Callouts use `Alert`.** Don't build custom styled divs.
- **Empty states use `Empty`.** Don't build custom empty state markup.
- **Toast via `sonner`.** Use `toast()` from `sonner`.
- **Use `Separator`** instead of `<hr>` or `<div className="border-t">`.
- **Use `Skeleton`** for loading placeholders. No custom `animate-pulse` divs.
- **Use `Badge`** instead of custom styled spans.

### Icons

- **Icons in `Button` use `data-icon`.** `data-icon="inline-start"` or
  `data-icon="inline-end"` on the icon.
- **No sizing classes on icons inside components.** Components handle icon
  sizing via CSS. No `size-4` or `w-4 h-4`.
- **Pass icons as objects, not string keys.** `icon={CheckIcon}`, not a string
  lookup.

### CLI

- **Never decode or fetch preset codes manually.** Pass them directly to
  `npx shadcn@latest init --preset <code>`.

## Key Patterns

```tsx
// Form layout: FieldGroup + Field, not div + Label.
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" />
  </Field>
</FieldGroup>

// Validation: data-invalid on Field, aria-invalid on the control.
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldDescription>Invalid email.</FieldDescription>
</Field>

// Icons in buttons: data-icon, no sizing classes.
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

// Spacing: gap-*, not space-y-*.
<div className="flex flex-col gap-4"> // correct
<div className="space-y-4"> // wrong

// Equal dimensions: size-*, not w-* h-*.
<Avatar className="size-10"> // correct
<Avatar className="w-10 h-10"> // wrong

// Status colors: Badge variants or semantic tokens, not raw colors.
<Badge variant="secondary">+20.1%</Badge> // correct
<span className="text-emerald-600">+20.1%</span> // wrong
```

## Component Selection

| Need | Use |
| ---- | --- |
| Button/action | `Button` with appropriate variant |
| Form inputs | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` |
| Toggle between 2–5 options | `ToggleGroup` + `ToggleGroupItem` |
| Data display | `Table`, `Card`, `Badge`, `Avatar` |
| Navigation | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination` |
| Overlays | `Dialog` (modal), `Sheet` (side panel), `Drawer` (bottom sheet), `AlertDialog` (confirmation) |
| Feedback | `sonner` (toast), `Alert`, `Progress`, `Skeleton`, `Spinner` |
| Command palette | `Command` inside `Dialog` |
| Charts | `Chart` (wraps Recharts) |
| Layout | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`, `Collapsible` |
| Empty states | `Empty` |
| Menus | `DropdownMenu`, `ContextMenu`, `Menubar` |
| Tooltips/info | `Tooltip`, `HoverCard`, `Popover` |

## Key Fields (`info --json`)

- **`aliases`** → use the actual alias prefix for imports (e.g. `@/`, `~/`),
  never hardcode.
- **`isRSC`** → when `true`, components using `useState`, `useEffect`, event
  handlers, or browser APIs need `"use client"` at the top of the file.
- **`tailwindVersion`** → `"v4"` uses `@theme inline` blocks; `"v3"` uses
  `tailwind.config.js`.
- **`tailwindCssFile`** → the global CSS file for CSS variables. Edit this
  file, never create a duplicate for tokens.
- **`style`** → component visual treatment (e.g. nova, vega).
- **`base`** → primitive library (`radix` or `base`). Affects APIs and props.
- **`iconLibrary`** → determines icon imports (`lucide-react`, `@tabler/icons-react`,
  etc.). Never assume `lucide-react`.
- **`resolvedPaths`** → exact destinations for components, utils, hooks, etc.
- **`framework`** → routing and file conventions (e.g. Next.js App Router vs Vite).
- **`packageManager`** → use for non-shadcn installs (e.g. `pnpm add date-fns`).

## Component Docs, Examples, and Usage

```bash
npx shadcn@latest docs button dialog select
```

**When creating, fixing, debugging, or using a component, run `docs` and open the
returned URLs** (or fetch them) so API and patterns match the registry in use.

## Workflow

1. **Get project context** — `npx shadcn@latest info --json` (refresh if needed).
2. **Check installed components** — before `add`, read `components` from info
   or list `resolvedPaths.ui`. Don't import unadded components; don't re-add
   existing ones without reason.
3. **Find components** — `npx shadcn@latest search`.
4. **Get docs and examples** — `docs <name>`, then `view` for registry items not
   installed. Use `add --diff` to preview updates to installed components.
5. **Install or update** — `add`. For updates, use `--dry-run` and `--diff`
   first (see Updating Components).
6. **Fix imports in third-party registry components** — After adding from
   community registries, fix hardcoded paths like `@/components/ui/...` using
   aliases from `info`.
7. **Review added files** — Verify composition, imports, icon library, and
   Critical Rules.
8. **Registry must be explicit** — If the user does not name a registry for a
   block/component, **ask** which registry to use. Do not pick a default.
9. **Switching presets** — Ask: **reinstall**, **merge**, or **skip**?
   - **Reinstall:** `init --preset <code> --force --reinstall` (overwrites
     components).
   - **Merge:** `init --preset <code> --force --no-reinstall`, then per-component
     `--dry-run` / `--diff` and merge carefully.
   - **Skip:** `init --preset <code> --force --no-reinstall` (config/CSS only).

   Run preset commands from the project root. Preserve `base` from
   `components.json`; in scratch dirs use `--base` explicitly.

## Updating Components

Use the CLI — **do not** fetch raw files from GitHub manually.

1. `npx shadcn@latest add <component> --dry-run`
2. Per file: `npx shadcn@latest add <component> --diff <file>`
3. Merge upstream changes with local edits; use `--overwrite` only with
   **explicit** user approval.

## Quick Reference

```bash
npx shadcn@latest init --name my-app --preset base-nova
npx shadcn@latest init --name my-app --preset a2r6bw --template vite
npx shadcn@latest init --name my-app --preset base-nova --monorepo
npx shadcn@latest init --preset base-nova
npx shadcn@latest init --defaults

npx shadcn@latest add button card dialog
npx shadcn@latest add @magicui/shimmer-button
npx shadcn@latest add --all
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff button.tsx

npx shadcn@latest search @shadcn -q "sidebar"
npx shadcn@latest docs button dialog select
npx shadcn@latest view @shadcn/button
```

**Named presets:** `base-nova`, `radix-nova`  
**Templates:** `next`, `vite`, `start`, `react-router`, `astro` (support
`--monorepo`); `laravel` (no monorepo)  
**Preset codes:** Base62 strings starting with `a` — see
https://ui.shadcn.com

## Further Reading (in this skill)

- [rules/styling.md](rules/styling.md)
- [rules/forms.md](rules/forms.md)
- [rules/composition.md](rules/composition.md)
- [rules/icons.md](rules/icons.md)
- [rules/base-vs-radix.md](rules/base-vs-radix.md)
- [cli.md](cli.md)
- [customization.md](customization.md)
