import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Copy, Heart, Plus, Share2 } from 'lucide-react'
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from './speed-dial'

const meta = {
  title: 'Components/SpeedDial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### SpeedDialContent

| Data attribute | Value |
| --- | --- |
| \`[data-state]\` | \`"open"\` \\| \`"closed"\` |
| \`[data-orientation]\` | \`"horizontal"\` \\| \`"vertical"\` |
| \`[data-side]\` | \`"top"\` \\| \`"right"\` \\| \`"bottom"\` \\| \`"left"\` |

### CSS variables

| Variable | Description |
| --- | --- |
| \`--speed-dial-gap\` | Gap between action items. Defaults to \`0.5rem\`. |
| \`--speed-dial-offset\` | Offset distance from the trigger. Defaults to \`0.5rem\`. |
| \`--speed-dial-transform-origin\` | Transform origin for animations based on the side. |
`,
      },
    },
  },
  tags: ['autodocs'],
  subcomponents: {
    SpeedDialAction,
    SpeedDialContent,
    SpeedDialItem,
    SpeedDialLabel,
    SpeedDialTrigger,
  },

  argTypes: {
    activationMode: {
      control: 'select',
      options: ['click', 'hover'],
      defaultValue: 'click',
    },
    delay: {
      control: 'number',
      defaultValue: 300,
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      defaultValue: 'top',
    },
  },
} satisfies Meta<typeof SpeedDial>

export default meta
type SpeedDialStory = StoryObj<typeof meta>

export const Default: SpeedDialStory = {
  render: args => {
    return (
      <SpeedDial {...args}>
        <SpeedDialTrigger className="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
          <Plus />
        </SpeedDialTrigger>
        <SpeedDialContent>
          <SpeedDialItem>
            <SpeedDialLabel>Share</SpeedDialLabel>
            <SpeedDialAction onSelect={() => alert('Shared')}>
              <Share2 />
            </SpeedDialAction>
          </SpeedDialItem>
          <SpeedDialItem>
            <SpeedDialLabel>Copy</SpeedDialLabel>
            <SpeedDialAction onSelect={() => alert('Copied')}>
              <Copy />
            </SpeedDialAction>
          </SpeedDialItem>
          <SpeedDialItem>
            <SpeedDialLabel>Like</SpeedDialLabel>
            <SpeedDialAction onSelect={() => alert('Liked')}>
              <Heart />
            </SpeedDialAction>
          </SpeedDialItem>
        </SpeedDialContent>
      </SpeedDial>
    )
  },
}
