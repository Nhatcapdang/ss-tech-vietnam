import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './button'
import { PlusIcon, User } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outline',
        'secondary',
        'ghost',
        'destructive',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: [
        'default',
        'xs',
        'sm',
        'lg',
        'icon',
        'icon-xs',
        'icon-sm',
        'icon-lg',
      ],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type ButtonStory = StoryObj<typeof meta>

// ─── All Variants Showcase ────────────────────────────────────────

export const AllVariants: ButtonStory = {
  name: 'Showcase — All Variants',
  render: args => (
    <div className="space-y-6 p-4">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Variants</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" {...args}>
            Default
          </Button>
          <Button variant="outline" {...args}>
            Outline
          </Button>
          <Button variant="secondary" {...args}>
            Secondary
          </Button>
          <Button variant="ghost" {...args}>
            Ghost
          </Button>
          <Button variant="destructive" {...args}>
            Destructive
          </Button>
          <Button variant="link" {...args}>
            Link
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs" {...args}>
            xs
          </Button>
          <Button size="sm" {...args}>
            sm
          </Button>
          <Button size="default" {...args}>
            default
          </Button>
          <Button size="lg" {...args}>
            lg
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">Icon Sizes</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            aria-label="icon-xs"
            size="icon-xs"
            variant="outline"
            {...args}
          >
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button
            aria-label="icon-sm"
            size="icon-sm"
            variant="outline"
            {...args}
          >
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button aria-label="icon" size="icon" variant="outline" {...args}>
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button
            aria-label="icon-lg"
            size="icon-lg"
            variant="outline"
            {...args}
          >
            <PlusIcon aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">Disabled</p>
        <div className="flex flex-wrap gap-2">
          <Button disabled variant="default" {...args}>
            Default
          </Button>
          <Button disabled variant="outline" {...args}>
            Outline
          </Button>
          <Button disabled variant="secondary" {...args}>
            Secondary
          </Button>
          <Button disabled variant="ghost" {...args}>
            Ghost
          </Button>
          <Button disabled variant="destructive" {...args}>
            Destructive
          </Button>
          <Button disabled variant="link" {...args}>
            Link
          </Button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">With Icon</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" {...args}>
            Default
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button variant="outline" {...args}>
            <PlusIcon aria-hidden="true" />
            Outline
          </Button>
          <Button variant="secondary" {...args}>
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button variant="ghost" {...args}>
            <User aria-hidden="true" />
            Ghost
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button variant="destructive" {...args}>
            <PlusIcon aria-hidden="true" />
            Destructive
          </Button>
          <Button disabled variant="link" {...args}>
            Link
            <PlusIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  ),
}
