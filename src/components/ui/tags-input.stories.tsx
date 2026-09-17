import { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import { RefreshCcw, X } from 'lucide-react'
import {
  TagsInput,
  TagsInputClear,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from './tags-input'
import { TagsInputItemDelete, TagsInputItemText } from '@diceui/tags-input'
import { Button } from './button'
import { toast } from 'sonner'
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableOverlay,
} from './sortable'
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

const meta = {
  title: 'Components/TagsInput',
  component: TagsInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagsInput>

export default meta
type TagsInputStory = StoryObj<typeof meta>

export const Default: TagsInputStory = {
  render: () => {
    const [tricks, setTricks] = React.useState<string[]>([])

    return (
      <TagsInput
        value={tricks}
        onValueChange={setTricks}
        className="flex w-[380px] flex-col gap-2"
        editable
      >
        <TagsInputLabel className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Tricks
        </TagsInputLabel>
        <div className="flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400">
          {tricks.map(trick => (
            <TagsInputItem
              key={trick}
              value={trick}
              className="inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-editable:select-none data-editing:bg-transparent data-editing:ring-1 data-editing:ring-zinc-500 dark:data-editing:ring-zinc-400 data-disabled:cursor-not-allowed data-disabled:opacity-50 [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-zinc-200 [&[data-highlighted]:not([data-editing])]:text-black dark:[&[data-highlighted]:not([data-editing])]:bg-zinc-800 dark:[&[data-highlighted]:not([data-editing])]:text-white"
            >
              <TagsInputItemText className="truncate" />
              <TagsInputItemDelete className="h-4 w-4 shrink-0 rounded-sm opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100">
                <X className="h-3.5 w-3.5" />
              </TagsInputItemDelete>
            </TagsInputItem>
          ))}
          <TagsInputInput
            placeholder="Add trick..."
            className="flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400"
          />
        </div>
        <TagsInputClear className="flex h-9 items-center justify-center gap-2 rounded-sm border border-input bg-transparent text-zinc-800 shadow-xs hover:bg-zinc-100/80 dark:text-zinc-300 dark:hover:bg-zinc-900/80">
          <RefreshCcw className="h-4 w-4" />
          Clear
        </TagsInputClear>
      </TagsInput>
    )
  },
}

export const WithEditable: TagsInputStory = {
  render: () => {
    const [tricks, setTricks] = React.useState([
      'Kickflip',
      'Heelflip',
      'FS 540',
    ])

    return (
      <TagsInput value={tricks} onValueChange={setTricks} editable addOnPaste>
        <TagsInputLabel>Tricks</TagsInputLabel>
        <TagsInputList>
          {tricks.map(trick => (
            <TagsInputItem key={trick} value={trick}>
              {trick}
            </TagsInputItem>
          ))}
          <TagsInputInput placeholder="Add trick..." />
        </TagsInputList>
        <TagsInputClear asChild>
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4" />
            Clear
          </Button>
        </TagsInputClear>
      </TagsInput>
    )
  },
}

export const WithValidation: TagsInputStory = {
  render: () => {
    const [tricks, setTricks] = React.useState<string[]>([])

    return (
      <TagsInput
        value={tricks}
        onValueChange={setTricks}
        onValidate={value => value.length > 2 && !value.includes('ollie')}
        onInvalid={value =>
          tricks.length >= 6
            ? toast.error('Up to 6 tricks are allowed.')
            : tricks.includes(value)
              ? toast.error(`${value} already exists.`)
              : toast.error(`${value} is not a valid trick.`)
        }
        max={6}
        editable
        addOnPaste
      >
        <TagsInputLabel>Tricks</TagsInputLabel>
        <TagsInputList>
          {tricks.map(trick => (
            <TagsInputItem key={trick} value={trick}>
              {trick}
            </TagsInputItem>
          ))}
          <TagsInputInput placeholder="Add trick..." />
        </TagsInputList>
        <div className="text-sm text-muted-foreground">
          Add up to 6 tricks with at least 3 characters, excluding
          &quot;ollie&quot;.
        </div>
      </TagsInput>
    )
  },
}

export const WithSortable: TagsInputStory = {
  render: () => {
    const [tricks, setTricks] = React.useState(['The 900', 'FS 540'])

    const sensors = useSensors(
      useSensor(MouseSensor, {
        activationConstraint: { distance: 8 },
      }),
      useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 5 },
      })
    )

    return (
      <Sortable
        sensors={sensors}
        value={tricks}
        onValueChange={items => setTricks(items)}
        orientation="mixed"
        flatCursor
      >
        <TagsInput value={tricks} onValueChange={setTricks} editable>
          <TagsInputLabel>Sortable</TagsInputLabel>
          <SortableContent>
            <TagsInputList>
              {tricks.map(trick => (
                <SortableItem
                  key={trick}
                  value={trick}
                  // to prevent tag item from being tabbable
                  tabIndex={-1}
                  asChild
                  asHandle
                >
                  <TagsInputItem value={trick}>{trick}</TagsInputItem>
                </SortableItem>
              ))}
              <TagsInputInput placeholder="Add trick..." />
            </TagsInputList>
          </SortableContent>
          <SortableOverlay>
            <div className="size-full animate-pulse rounded-sm bg-primary/10" />
          </SortableOverlay>
        </TagsInput>
      </Sortable>
    )
  },
}
