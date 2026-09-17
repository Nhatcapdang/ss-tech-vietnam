# Styling & Tailwind (shadcn)

## Layout vs theme

- Use `className` for **layout** (flex, grid, gap, max-width). Avoid overriding
  built-in **colors** and **typography** on primitives unless theming requires it.

## Spacing

- Prefer `flex` + `gap-*` over `space-x-*` / `space-y-*`.
- Vertical stacks: `flex flex-col gap-*`.

## Sizing

- Equal width and height: `size-*` (e.g. `size-10`), not `w-* h-*` unless
  dimensions differ.

## Text overflow

- Use `truncate` instead of
  `overflow-hidden text-ellipsis whitespace-nowrap` unless you need exceptions.

## Dark mode

- Avoid ad-hoc `dark:` color classes. Use semantic tokens: `bg-background`,
  `text-foreground`, `text-muted-foreground`, `border`, etc.

## Conditional classes

- Use `cn()` from the project's utils (see `info` aliases) for conditional
  classes, not long template-literal ternaries.

## Stacking (z-index)

- Do not set manual `z-index` on Dialog, Sheet, Popover, Tooltip hosts unless
  the design system documents an exception—they manage stacking.

## Incorrect vs correct

| Incorrect | Correct |
| --------- | ------- |
| `className="text-blue-500"` | `className="text-primary"` or Badge variant |
| `space-y-4` for new layout | `flex flex-col gap-4` |
| `w-10 h-10` for square | `size-10` |
| `dark:bg-gray-900` one-off | semantic `bg-*` tokens |
