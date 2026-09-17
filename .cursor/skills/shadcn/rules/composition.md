# Component Structure & Composition (shadcn)

## Groups

- Put items in the right **Group** primitive: `SelectItem` under `SelectGroup`
  when grouping; `DropdownMenuItem` under `DropdownMenuGroup`; `CommandItem`
  under `CommandGroup`—follow the installed component's examples.

## Overlays

- **Dialog**, **Sheet**, **Drawer**: always expose an accessible **Title**
  (`DialogTitle`, etc.). Use `className="sr-only"` if the design hides the
  title visually.

## Card

- Prefer **CardHeader** / **CardTitle** / **CardDescription** /
  **CardContent** / **CardFooter** instead of one `CardContent` with everything.

## Button loading

- No `isLoading` / `isPending` prop in core Button patterns: compose
  **`Spinner`**, **`data-icon`**, and **`disabled`** as in your registry docs.

## Tabs

- **`TabsTrigger`** must live inside **`TabsList`**, not directly under **Tabs**.

## Avatar

- Always provide **`AvatarFallback`** for failed image loads and initials.

## Prefer primitives over bespoke markup

| Need | Use |
| ---- | --- |
| Callout | `Alert` |
| Empty state | `Empty` |
| Toast | `sonner` `toast()` |
| Divider | `Separator` |
| Loading placeholder | `Skeleton` |
| Small status label | `Badge` |

## Incorrect vs correct

| Incorrect | Correct |
| --------- | ------- |
| `<hr />` or `border-t` div | `<Separator />` |
| Custom empty flex column | `<Empty />` patterns |
| `animate-pulse` div | `<Skeleton />` |
