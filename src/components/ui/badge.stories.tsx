import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InfoIcon } from 'lucide-react'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
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
        'info',
        'success',
        'warning',
        'destructive',
        'focus',
        'invert',
        'primary-light',
        'warning-light',
        'success-light',
        'info-light',
        'destructive-light',
        'invert-light',
        'focus-light',
        'primary-outline',
        'warning-outline',
        'success-outline',
        'info-outline',
        'destructive-outline',
        'invert-outline',
        'focus-outline',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: ['default', 'full'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const BadgeVariants: Story = {
  render: args => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge variant="default" {...args}>
        Default
      </Badge>
      <Badge variant="outline" {...args}>
        Outline
      </Badge>
      <Badge variant="secondary" {...args}>
        Secondary
      </Badge>
      <Badge variant="info" {...args}>
        Info
      </Badge>
      <Badge variant="success" {...args}>
        Success
      </Badge>
      <Badge variant="warning" {...args}>
        Warning
      </Badge>
      <Badge variant="destructive" {...args}>
        Destructive
      </Badge>
      <Badge variant="focus" {...args}>
        Focus
      </Badge>
      <Badge variant="invert" {...args}>
        Invert
      </Badge>
      <Badge variant="primary-light" {...args}>
        Primary Light
      </Badge>
      <Badge variant="warning-light" {...args}>
        Warning Light
      </Badge>
      <Badge variant="success-light" {...args}>
        Success Light
      </Badge>
      <Badge variant="info-light" {...args}>
        Info Light
      </Badge>
      <Badge variant="destructive-light" {...args}>
        Destructive Light
      </Badge>
      <Badge variant="invert-light" {...args}>
        Invert Light
      </Badge>
      <Badge variant="focus-light" {...args}>
        Focus Light
      </Badge>
      <Badge variant="primary-outline" {...args}>
        Primary Outline
      </Badge>
      <Badge variant="warning-outline" {...args}>
        Warning Outline
      </Badge>
      <Badge variant="success-outline" {...args}>
        Success Outline
      </Badge>
      <Badge variant="info-outline" {...args}>
        Info Outline
      </Badge>
      <Badge variant="destructive-outline" {...args}>
        Destructive Outline
      </Badge>
      <Badge variant="invert-outline" {...args}>
        Invert Outline
      </Badge>
      <Badge variant="focus-outline" {...args}>
        Focus Outline
      </Badge>
    </div>
  ),
}

export const BadgeWithIcon: Story = {
  args: {
    size: 'lg',
  },
  render: args => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge variant="default" {...args}>
        <InfoIcon aria-hidden="true" />
      </Badge>
      <Badge variant="outline" {...args}>
        <InfoIcon aria-hidden="true" />
        Info
      </Badge>
      <Badge variant="secondary" {...args}>
        Secondary
        <InfoIcon aria-hidden="true" />
      </Badge>
    </div>
  ),
}
