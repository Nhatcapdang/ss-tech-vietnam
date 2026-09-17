# Icons (shadcn)

## Buttons

- For icon + label buttons, set **`data-icon="inline-start"`** or
  **`data-icon="inline-end"`** on the icon element when your installed Button
  styles expect it.

## Sizing

- Avoid extra **`size-*` / `w-*` / `h-*`** on icons inside components that already
  size icons via CSS—follow the copy-pasted registry snippet.

## Passing icons

- Pass **components** (`icon={CheckIcon}`), not string keys, when APIs ask for
  icon props.

## Library

- Import from the project's **`iconLibrary`** in `shadcn info` (e.g. lucide,
  tabler)—do not assume `lucide-react` without checking.

## Incorrect vs correct

| Incorrect | Correct |
| --------- | ------- |
| `<Plus className="size-4" />` inside a sized Button | Icon without redundant size, or per docs |
| `icon="check"` | `icon={CheckIcon}` |
