# Base UI vs Radix (shadcn `base` field)

Read **`base`** from `npx shadcn@latest info --json`.

## Triggers

- **Radix**-style registries often use **`asChild`** on triggers to compose with
  `Button` / `Link`.
- **Base UI**-style registries often use a **`render`** prop (or documented
  equivalent) instead of `asChild`.

## When unsure

1. Run `npx shadcn@latest docs <component>` for the installed registry.
2. Copy patterns from the **same** `base` + registry as the project.

## Common differences

- APIs and part names may differ (e.g. Select, ToggleGroup, Slider, Accordion).
- Do not mix Radix tutorial code into a `base: "base"` project without adapting.
