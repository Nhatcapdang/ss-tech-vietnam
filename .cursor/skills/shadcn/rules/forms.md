# Forms & Inputs (shadcn)

## Structure

- Use **`FieldGroup`** + **`Field`** for labeled controls. Avoid bare `div` +
  `space-y-*` or unstyled `grid gap-*` for the same purpose when Field APIs exist.

## Input groups

- Inside **`InputGroup`**, use **`InputGroupInput`** / **`InputGroupTextarea`**,
  not raw `Input` / `Textarea` unless the registry's docs say otherwise.
- Actions embedded in the field (icons, buttons) → **`InputGroupAddon`** (order
  per your UI package docs).

## Option sets

- Roughly **2–7** mutually exclusive options → **`ToggleGroup`** +
  **`ToggleGroupItem`**, not a manual map of `Button` with local active state.

## Grouping radios/checkboxes

- Use **`FieldSet`** + **`FieldLegend`** (or documented equivalents) for related
  radios/checkboxes—not a `div` + heading alone.

## Validation and disabled state

- Invalid: `data-invalid` on **`Field`**, `aria-invalid` on the **control**.
  Show **`FieldDescription`** / **`FieldError`** as documented.
- Disabled: `data-disabled` on **`Field`**, `disabled` on the **control**.

## Incorrect vs correct

| Incorrect | Correct |
| --------- | ------- |
| `<div className="space-y-4"><Label/><Input/></div>` | `<FieldGroup><Field>…</Field></FieldGroup>` |
| `<InputGroup><Input /></InputGroup>` | `<InputGroup><InputGroupInput /></InputGroup>` |
| Three `Button`s + `useState` for segment | `ToggleGroup` |
