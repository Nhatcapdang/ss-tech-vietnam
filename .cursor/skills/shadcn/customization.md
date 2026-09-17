# Customization (shadcn)

## CSS variables & theme

- Edit the file indicated by **`tailwindCssFile`** in `shadcn info` (and any
  documented theme fragments). **Do not** introduce a second global file for the
  same tokens without a documented reason.

## Tailwind version

- **`tailwindVersion` `v4`:** `@theme inline` and CSS-first configuration patterns
  per your template.
- **`v3`:** `tailwind.config.js` (or TS) as generated.

## Extending components

- Prefer **variants** (`cva`, `buttonVariants`, etc.) and **semantic tokens**
  before forking entire components.
- When updating from upstream, use **`add --diff`** to merge rather than
  pasting from GitHub.

## Registries

- Third-party blocks may assume default `@/components/ui` paths—**rewrite
  imports** to match **`aliases`** / **`resolvedPaths`** from `info`.
