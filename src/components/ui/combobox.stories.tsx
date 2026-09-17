import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  BugIcon,
  ChevronsUpDownIcon,
  CircleDashedIcon,
  FolderKanbanIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
  WorkflowIcon,
  type LucideIcon,
} from 'lucide-react'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from './combobox'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { InputGroupAddon } from './input-group'
import { Badge } from './badge'
import { Button } from './button'
import { Field, FieldError, FieldLabel } from './field'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from './item'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { useState } from 'react'

const meta = {
  title: 'UI/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    items: [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
      { label: 'Item 3', value: 'item3' },
    ],
    disabled: false,
    autoHighlight: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    autoHighlight: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  // decorators: [
  //   Story => (
  //     <div className="w-48">
  //       <Story />
  //     </div>
  //   ),
  // ],
} satisfies Meta<typeof Combobox>

export default meta

type ComboboxStory = StoryObj<typeof meta>

export const Default: ComboboxStory = {
  render: ({ disabled, ...args }) => (
    <Combobox {...args}>
      <ComboboxInput
        placeholder="Select a framework"
        disabled={disabled}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {item => (
            <ComboboxItem key={item.value} value={item}>
              <span>{item.label}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const ComboboxWithGroup: ComboboxStory = {
  render: ({ disabled, ...args }) => (
    <Combobox
      {...args}
      items={[
        {
          value: 'Americas',
          items: [
            '(GMT-5) New York',
            '(GMT-8) Los Angeles',
            '(GMT-6) Chicago',
            '(GMT-5) Toronto',
            '(GMT-8) Vancouver',
            '(GMT-3) São Paulo',
          ],
        },
        {
          value: 'Europe',
          items: [
            '(GMT+0) London',
            '(GMT+1) Paris',
            '(GMT+1) Berlin',
            '(GMT+1) Rome',
            '(GMT+1) Madrid',
            '(GMT+1) Amsterdam',
          ],
        },
      ]}
    >
      <ComboboxInput placeholder="Select a timezone" disabled={disabled} />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {group => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {item => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              <ComboboxSeparator className="group-last/combobox-group:hidden" />
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const ComboboxWithIconAddon: ComboboxStory = {
  render: ({ disabled, ...args }) => (
    <Combobox
      {...args}
      items={['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']}
    >
      <ComboboxInput placeholder="Select a framework" disabled={disabled}>
        <InputGroupAddon>
          <GlobeIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {item => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const ComboboxInPopup: ComboboxStory = {
  render: () => {
    const countries = [
      { code: 'af', label: 'Afghanistan' },
      { code: 'al', label: 'Albania' },
      { code: 'dz', label: 'Algeria' },
      { code: 'as', label: 'American Samoa' },
      { code: 'ad', label: 'Andorra' },
      { code: 'ao', label: 'Angola' },
    ]
    return (
      <Combobox
        items={countries}
        defaultValue={countries[0]}
        itemToStringValue={(item: (typeof countries)[number]) => item.label}
      >
        <ComboboxTrigger
          render={
            <Button variant="outline" className="justify-between font-normal" />
          }
        >
          <ComboboxValue>
            {(item: (typeof countries)[number]) => (
              <span className="flex w-50 items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                  alt={item.label}
                  className="h-4 w-4 rounded-xs"
                />
                <span>{item.label}</span>
              </span>
            )}
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput showTrigger={false} placeholder="Search" />
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {item => (
              <ComboboxItem key={item.code} value={item}>
                <image
                  href={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                  width={16}
                  height={12}
                  className="rounded-xs"
                />
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const MultiSelectCombobox: ComboboxStory = {
  render: ({ disabled }) => {
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']
    const anchor = useComboboxAnchor()
    return (
      <Field className="max-w-xs">
        <FieldLabel>Frameworks</FieldLabel>
        <Combobox
          multiple
          autoHighlight
          items={frameworks}
          defaultValue={[frameworks[0], frameworks[1]]}
          disabled={disabled}
        >
          <ComboboxChips ref={anchor} id="combobox-multiple-invalid">
            <ComboboxValue>
              {values => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Select frameworks..." />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

export const MultiSelectInvalidCombobox: ComboboxStory = {
  render: ({ disabled }) => {
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']
    const anchor = useComboboxAnchor()
    return (
      <Field className="max-w-xs" data-invalid>
        <FieldLabel htmlFor="combobox-multiple-invalid">Frameworks</FieldLabel>
        <Combobox
          multiple
          autoHighlight
          items={frameworks}
          defaultValue={[frameworks[0], frameworks[1]]}
          disabled={disabled}
        >
          <ComboboxChips
            ref={anchor}
            aria-invalid
            id="combobox-multiple-invalid"
          >
            <ComboboxValue>
              {values => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Select frameworks..." />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldError errors={[{ message: 'This field is required.' }]} />
      </Field>
    )
  },
}

export const MultiSelectComboboxWithChips: ComboboxStory = {
  render: () => {
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']
    const anchor = useComboboxAnchor()
    return (
      <Field className="max-w-xs">
        <Combobox
          multiple
          autoHighlight
          items={frameworks}
          defaultValue={[frameworks[0], frameworks[1]]}
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {values => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value} showRemove={false}>
                      {value}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Select frameworks..." />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

export const ComboboxWithCustomItemRendering: ComboboxStory = {
  render: () => {
    const users = [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80',
        initials: 'AJ',
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        avatar:
          'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80',
        initials: 'SC',
      },
      {
        id: '3',
        name: 'Michael Rodriguez',
        email: 'michael@example.com',
        avatar:
          'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80',
        initials: 'MR',
      },
      {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        avatar:
          'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80',
        initials: 'EW',
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david@example.com',
        avatar:
          'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80',
        initials: 'DK',
      },
      {
        id: '6',
        name: 'Aron Thompson',
        email: 'lisa@example.com',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80',
        initials: 'LT',
      },
      {
        id: '7',
        name: 'James Brown',
        email: 'james@example.com',
        avatar:
          'https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80',
        initials: 'JB',
      },
      {
        id: '8',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        avatar:
          'https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80',
        initials: 'MG',
      },
      {
        id: '9',
        name: 'Nick Johnson',
        email: 'nick@example.com',
        avatar:
          'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80',
        initials: 'NJ',
      },
      {
        id: '10',
        name: 'Liam Thompson',
        email: 'liam@example.com',
        avatar:
          'https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80',
        initials: 'LT',
      },
    ]
    const members = users.map((user, index) => ({
      ...user,
      position: [
        'Software Engineer',
        'Product Manager',
        'UX Designer',
        'Technical Lead',
        'CTO',
      ][index % 5],
    }))

    return (
      <Field className="w-md">
        <Combobox
          items={members}
          defaultValue={members[0]}
          itemToStringValue={(member: (typeof members)[number]) => member.name}
        >
          <ComboboxTrigger
            render={
              <Button
                variant="outline"
                className="w-full justify-between font-normal"
              />
            }
          >
            <ComboboxValue>
              {(member: (typeof members)[number]) =>
                member ? (
                  <span className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={member?.avatar} alt={member?.name} />
                      <AvatarFallback>{member?.initials}</AvatarFallback>
                    </Avatar>
                    <span>{member?.name}</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Select a member</span>
                )
              }
            </ComboboxValue>
          </ComboboxTrigger>
          <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
            <ComboboxInput
              showTrigger={false}
              placeholder="Search members..."
            />
            <ComboboxEmpty>No members found.</ComboboxEmpty>
            <ComboboxList>
              {member => (
                <ComboboxItem key={member.id} value={member}>
                  <Item size="xs" className="p-0">
                    <Avatar className="size-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <ItemContent>
                      <ItemTitle className="whitespace-nowrap">
                        {member.name}
                      </ItemTitle>
                      <ItemDescription>{member.position}</ItemDescription>
                    </ItemContent>
                  </Item>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

interface StatusOption {
  id: string
  label: string
  description: string
  variant:
    | 'info-light'
    | 'warning-light'
    | 'success-light'
    | 'destructive-light'
}

interface TemplateOption {
  id: string
  name: string
  category: string
  description: string
  icon: LucideIcon
}

interface CommandOption {
  id: string
  label: string
  description: string
  shortcut: string
  icon: LucideIcon
}

export const StatusFilterCombobox: ComboboxStory = {
  render: () => {
    const statuses: StatusOption[] = [
      {
        id: 'backlog',
        label: 'Backlog',
        description: 'Ideas and requests that still need grooming.',
        variant: 'warning-light',
      },
      {
        id: 'in-review',
        label: 'In review',
        description: 'Waiting for product, design, or QA approval.',
        variant: 'info-light',
      },
      {
        id: 'ready',
        label: 'Ready to ship',
        description: 'Approved work that can move into the next release.',
        variant: 'success-light',
      },
      {
        id: 'blocked',
        label: 'Blocked',
        description: 'Dependencies or issues are preventing progress.',
        variant: 'destructive-light',
      },
    ]

    return (
      <Field className="w-[320px]">
        <FieldLabel>Status</FieldLabel>
        <Combobox
          items={statuses}
          defaultValue={statuses[1]}
          itemToStringValue={status => status.label}
        >
          <ComboboxTrigger
            render={
              <Button
                variant="outline"
                className="w-full justify-between font-normal"
              />
            }
          >
            <ComboboxValue>
              {(status: StatusOption | null) =>
                status ? (
                  <span className="flex min-w-0 items-center gap-2 text-left">
                    <Badge variant={status.variant} radius="full">
                      {status.label}
                    </Badge>
                    <span className="truncate text-muted-foreground">
                      {status.description}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Filter by status
                  </span>
                )
              }
            </ComboboxValue>
          </ComboboxTrigger>
          <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
            <ComboboxInput
              showTrigger={false}
              placeholder="Search statuses..."
            />
            <ComboboxEmpty>No statuses found.</ComboboxEmpty>
            <ComboboxList>
              {status => (
                <ComboboxItem key={status.id} value={status}>
                  <Item size="xs" className="p-0">
                    <ItemContent>
                      <ItemTitle>
                        <Badge variant={status.variant} radius="full">
                          {status.label}
                        </Badge>
                      </ItemTitle>
                      <ItemDescription>{status.description}</ItemDescription>
                    </ItemContent>
                  </Item>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

export const ProjectTemplateCombobox: ComboboxStory = {
  render: () => {
    const templates: TemplateOption[] = [
      {
        id: 'sales-crm',
        name: 'Sales CRM',
        category: 'Operations',
        description: 'Track pipeline, meetings, and follow-up tasks.',
        icon: BriefcaseBusinessIcon,
      },
      {
        id: 'product-sprint',
        name: 'Product Sprint',
        category: 'Product',
        description: 'Plan roadmap work, ceremonies, and release notes.',
        icon: FolderKanbanIcon,
      },
      {
        id: 'bug-triage',
        name: 'Bug Triage',
        category: 'Engineering',
        description: 'Prioritize incidents, regressions, and hotfixes.',
        icon: BugIcon,
      },
      {
        id: 'customer-portal',
        name: 'Customer Portal',
        category: 'Support',
        description: 'Organize tickets, SLAs, and onboarding requests.',
        icon: UsersIcon,
      },
    ]

    return (
      <Field className="w-[380px]">
        <FieldLabel>Start from a template</FieldLabel>
        <Combobox
          items={templates}
          defaultValue={templates[1]}
          itemToStringValue={template => template.name}
        >
          <ComboboxTrigger
            render={
              <Button
                variant="outline"
                className="h-auto w-full justify-between px-3 py-2 font-normal"
              />
            }
          >
            <ComboboxValue>
              {(template: TemplateOption | null) => {
                if (!template) {
                  return (
                    <span className="text-muted-foreground">
                      Choose a project template
                    </span>
                  )
                }

                const Icon = template.icon

                return (
                  <span className="flex min-w-0 items-center gap-3 text-left">
                    <ItemMedia
                      variant="icon"
                      className="size-8 rounded-md bg-muted text-muted-foreground"
                    >
                      <Icon />
                    </ItemMedia>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {template.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {template.description}
                      </span>
                    </span>
                    <Badge variant="secondary" radius="full">
                      {template.category}
                    </Badge>
                  </span>
                )
              }}
            </ComboboxValue>
          </ComboboxTrigger>
          <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
            <ComboboxInput
              showTrigger={false}
              placeholder="Search templates..."
            />
            <ComboboxEmpty>No templates found.</ComboboxEmpty>
            <ComboboxList>
              {template => {
                const Icon = template.icon

                return (
                  <ComboboxItem key={template.id} value={template}>
                    <Item size="xs" className="p-0">
                      <ItemMedia
                        variant="icon"
                        className="size-8 rounded-md bg-muted text-muted-foreground"
                      >
                        <Icon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{template.name}</ItemTitle>
                        <ItemDescription>
                          {template.description}
                        </ItemDescription>
                      </ItemContent>
                      <Badge variant="secondary" radius="full">
                        {template.category}
                      </Badge>
                    </Item>
                  </ComboboxItem>
                )
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

export const CommandPaletteCombobox: ComboboxStory = {
  render: () => {
    const commandGroups: Array<{
      value: string
      items: CommandOption[]
    }> = [
      {
        value: 'Views',
        items: [
          {
            id: 'dashboard',
            label: 'Dashboard',
            description: 'Overview, goals, and recent team activity.',
            shortcut: 'G D',
            icon: LayoutDashboardIcon,
          },
          {
            id: 'projects',
            label: 'Projects',
            description: 'Browse active work, owners, and due dates.',
            shortcut: 'G P',
            icon: FolderKanbanIcon,
          },
        ],
      },
      {
        value: 'People',
        items: [
          {
            id: 'team-directory',
            label: 'Team directory',
            description: 'Find teammates, roles, and current workload.',
            shortcut: 'G T',
            icon: UsersIcon,
          },
          {
            id: 'workflow-rules',
            label: 'Workflow rules',
            description: 'Edit automations, routing, and approval logic.',
            shortcut: 'G W',
            icon: WorkflowIcon,
          },
        ],
      },
      {
        value: 'Actions',
        items: [
          {
            id: 'ai-summary',
            label: 'Generate AI summary',
            description: 'Create a short project recap for stakeholders.',
            shortcut: 'A S',
            icon: SparklesIcon,
          },
          {
            id: 'start-review',
            label: 'Start review',
            description: 'Open a review queue for current sprint items.',
            shortcut: 'R V',
            icon: BadgeCheckIcon,
          },
          {
            id: 'investigate-issue',
            label: 'Investigate issue',
            description: 'Jump into open incidents and bug reports.',
            shortcut: 'B U',
            icon: CircleDashedIcon,
          },
        ],
      },
    ]

    return (
      <Field className="w-[420px]">
        <FieldLabel>Command search</FieldLabel>
        <Combobox
          items={commandGroups}
          itemToStringValue={(command: CommandOption) => command.label}
        >
          <ComboboxTrigger
            render={
              <Button
                variant="outline"
                className="w-full justify-between font-normal"
              />
            }
          >
            <ComboboxValue>
              {(command: CommandOption | null) => {
                if (!command) {
                  return (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <SearchIcon className="size-4" />
                      Jump to a page or action...
                    </span>
                  )
                }

                const Icon = command.icon

                return (
                  <span className="flex min-w-0 items-center gap-3 text-left">
                    <ItemMedia
                      variant="icon"
                      className="size-8 rounded-md bg-muted text-muted-foreground"
                    >
                      <Icon />
                    </ItemMedia>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {command.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {command.description}
                      </span>
                    </span>
                    <Badge variant="outline" radius="full">
                      {command.shortcut}
                    </Badge>
                  </span>
                )
              }}
            </ComboboxValue>
            <Badge variant="outline" radius="full">
              ⌘K
            </Badge>
          </ComboboxTrigger>
          <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
            <ComboboxInput
              showTrigger={false}
              placeholder="Type a page or action..."
            />
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxList>
              {group => (
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {command => {
                      const Icon = command.icon

                      return (
                        <ComboboxItem key={command.id} value={command}>
                          <Item size="xs" className="p-0">
                            <ItemMedia
                              variant="icon"
                              className="size-8 rounded-md bg-muted text-muted-foreground"
                            >
                              <Icon />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{command.label}</ItemTitle>
                              <ItemDescription>
                                {command.description}
                              </ItemDescription>
                            </ItemContent>
                            <Badge variant="outline" radius="full">
                              {command.shortcut}
                            </Badge>
                          </Item>
                        </ComboboxItem>
                      )
                    }}
                  </ComboboxCollection>
                  <ComboboxSeparator className="group-last/combobox-group:hidden" />
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

//Invisible combobox with member tags
export const InvisibleComboboxWithMemberTags: ComboboxStory = {
  render: () => {
    const anchor = useComboboxAnchor()

    const users = [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80',
        initials: 'AJ',
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        avatar:
          'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80',
        initials: 'SC',
      },
      {
        id: '3',
        name: 'Michael Rodriguez',
        email: 'michael@example.com',
        avatar:
          'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80',
        initials: 'MR',
      },
      {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        avatar:
          'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80',
        initials: 'EW',
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david@example.com',
        avatar:
          'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80',
        initials: 'DK',
      },
      {
        id: '6',
        name: 'Aron Thompson',
        email: 'lisa@example.com',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80',
        initials: 'LT',
      },
      {
        id: '7',
        name: 'James Brown',
        email: 'james@example.com',
        avatar:
          'https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80',
        initials: 'JB',
      },
      {
        id: '8',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        avatar:
          'https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80',
        initials: 'MG',
      },
      {
        id: '9',
        name: 'Nick Johnson',
        email: 'nick@example.com',
        avatar:
          'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80',
        initials: 'NJ',
      },
      {
        id: '10',
        name: 'Liam Thompson',
        email: 'liam@example.com',
        avatar:
          'https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80',
        initials: 'LT',
      },
    ]
    const members = users.map((user, index) => ({
      ...user,
      position: [
        'Software Engineer',
        'Product Manager',
        'UX Designer',
        'Technical Lead',
        'CTO',
      ][index % 5],
    }))

    return (
      <Field className="max-w-xs">
        <Combobox
          multiple
          items={members}
          itemToStringValue={(member: (typeof members)[number]) => member.name}
          defaultValue={[members[5], members[9], members[3]]}
        >
          <ComboboxChips
            ref={anchor}
            className="border-none bg-transparent p-0 shadow-none ring-0 focus-within:ring-0"
          >
            <ComboboxValue>
              {(selectedMembers: (typeof members)[number][]) => (
                <>
                  {selectedMembers.map(member => (
                    <ComboboxChip
                      key={member.id}
                      showRemove={true}
                      className="inline-flex h-auto items-center gap-1.5 rounded-full border bg-background py-0.5 pl-2 shadow-xs **:data-[slot=combobox-chip-remove]:mr-0.5 **:data-[slot=combobox-chip-remove]:bg-transparent"
                    >
                      <Avatar className="size-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-[8px]">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      {member.name}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder="Add members..."
                    className="bg-transparent"
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent
            anchor={anchor}
            className="max-w-(--anchor-width) min-w-(--anchor-width)"
          >
            <ComboboxEmpty>No members found.</ComboboxEmpty>
            <ComboboxList>
              {member => (
                <ComboboxItem key={member.id} value={member}>
                  <Item size="xs" className="p-0">
                    <Avatar className="size-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <ItemContent>
                      <ItemTitle className="whitespace-nowrap">
                        {member.name}
                      </ItemTitle>
                      <ItemDescription>{member.position}</ItemDescription>
                    </ItemContent>
                  </Item>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

// A multi-select combobox with user tags
export const MultiSelectComboboxWithUserTags: ComboboxStory = {
  render: () => {
    const anchor = useComboboxAnchor()
    const users = [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80',
        initials: 'AJ',
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        avatar:
          'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80',
        initials: 'SC',
      },
      {
        id: '3',
        name: 'Michael Rodriguez',
        email: 'michael@example.com',
        avatar:
          'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80',
        initials: 'MR',
      },
      {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        avatar:
          'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80',
        initials: 'EW',
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david@example.com',
        avatar:
          'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80',
        initials: 'DK',
      },
      {
        id: '6',
        name: 'Aron Thompson',
        email: 'lisa@example.com',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&dpr=2&q=80',
        initials: 'LT',
      },
      {
        id: '7',
        name: 'James Brown',
        email: 'james@example.com',
        avatar:
          'https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80',
        initials: 'JB',
      },
      {
        id: '8',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        avatar:
          'https://images.unsplash.com/photo-1620075225255-8c2051b6c015?w=96&h=96&dpr=2&q=80',
        initials: 'MG',
      },
      {
        id: '9',
        name: 'Nick Johnson',
        email: 'nick@example.com',
        avatar:
          'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?w=96&h=96&dpr=2&q=80',
        initials: 'NJ',
      },
      {
        id: '10',
        name: 'Liam Thompson',
        email: 'liam@example.com',
        avatar:
          'https://images.unsplash.com/photo-1542595913-85d69b0edbaf?w=96&h=96&dpr=2&q=80',
        initials: 'LT',
      },
    ]
    const members = users.map((user, index) => ({
      ...user,
      position: [
        'Software Engineer',
        'Product Manager',
        'UX Designer',
        'Technical Lead',
        'CTO',
      ][index % 5],
    }))

    return (
      <Field className="max-w-xs">
        <Combobox
          multiple
          items={members}
          itemToStringValue={(member: (typeof members)[number]) => member.name}
          defaultValue={[members[0], members[1]]}
        >
          <ComboboxChips
            ref={anchor}
            className="has-data-[slot=combobox-chip]:pl-1"
          >
            <ComboboxValue>
              {(selectedMembers: (typeof members)[number][]) => (
                <>
                  {selectedMembers.map(member => (
                    <ComboboxChip
                      key={member.id}
                      showRemove={true}
                      className="gap-1.5 rounded-full"
                    >
                      <Avatar className="size-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-[8px]">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      {member.name}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Add members..." />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent
            anchor={anchor}
            className="max-w-(--anchor-width) min-w-(--anchor-width)"
          >
            <ComboboxEmpty>No members found.</ComboboxEmpty>
            <ComboboxList>
              {member => (
                <ComboboxItem key={member.id} value={member}>
                  <Item size="xs" className="p-0">
                    <Avatar className="size-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <ItemContent>
                      <ItemTitle className="whitespace-nowrap">
                        {member.name}
                      </ItemTitle>
                      <ItemDescription>{member.position}</ItemDescription>
                    </ItemContent>
                  </Item>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

//A combobox used within a dialog
export const ComboboxInDialog: ComboboxStory = {
  render: () => {
    const [open, setOpen] = useState(false)
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']

    return (
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild>
          <Button className="w-full max-w-xs">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Select Framework</DialogTitle>
            <DialogDescription>
              Choose your preferred framework from the list below.
            </DialogDescription>
          </DialogHeader>
          <Field className="pt-4">
            <FieldLabel htmlFor="framework-dialog" className="sr-only">
              Framework
            </FieldLabel>
            <Combobox items={frameworks}>
              <ComboboxInput
                id="framework-dialog"
                placeholder="Select a framework"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {item => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                alert('Framework selected.')
                setOpen(false)
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// A combobox with a custom trigger icon
export const ComboboxWithCustomTriggerIcon: ComboboxStory = {
  render: () => {
    // import { Combobox as ComboboxPrimitive } from '@base-ui/react'
    const [value, setValue] = useState<string | null>(null)
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']

    return (
      <Field className="max-w-xs">
        <Combobox value={value} onValueChange={setValue} items={frameworks}>
          <ComboboxInput
            placeholder="Select framework"
            showTrigger={false}
            showClear={true}
          >
            {!value && (
              <ComboboxPrimitive.Trigger data-slot="combobox-trigger">
                <ChevronsUpDownIcon className="pointer-events-none size-4 text-muted-foreground" />
              </ComboboxPrimitive.Trigger>
            )}
          </ComboboxInput>
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

export const StatusPickerCombobox: ComboboxStory = {
  render: () => {
    const statuses = [
      {
        value: 'backlog',
        label: 'Backlog',
        description: 'Not started yet',
      },
      {
        value: 'in-progress',
        label: 'In Progress',
        description: 'Currently being worked on',
      },
      {
        value: 'review',
        label: 'In Review',
        description: 'Waiting for approval',
      },
      {
        value: 'done',
        label: 'Done',
        description: 'Completed and verified',
      },
    ]

    const statusColorByValue: Record<string, string> = {
      backlog: 'bg-muted-foreground/60',
      'in-progress': 'bg-blue-500',
      review: 'bg-amber-500',
      done: 'bg-emerald-500',
    }

    const [status, setStatus] = useState<(typeof statuses)[number] | null>(
      statuses[1]
    )

    return (
      <Field className="w-sm">
        <FieldLabel>Issue status</FieldLabel>
        <Combobox
          items={statuses}
          value={status}
          onValueChange={setStatus}
          itemToStringValue={(item: (typeof statuses)[number]) => item.label}
        >
          <ComboboxInput
            placeholder="Select status"
            showClear
            className="w-full"
          />
          <ComboboxContent>
            <ComboboxEmpty>No statuses found.</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={item.value} value={item}>
                  <span
                    className={`size-2 rounded-full ${
                      statusColorByValue[item.value]
                    }`}
                  />
                  <Item size="xs" className="p-0">
                    <ItemContent>
                      <ItemTitle>{item.label}</ItemTitle>
                      <ItemDescription>{item.description}</ItemDescription>
                    </ItemContent>
                  </Item>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}

export const GroupedProjectLabels: ComboboxStory = {
  render: () => {
    const groups = [
      {
        value: 'Priority',
        items: ['P0 - Critical', 'P1 - High', 'P2 - Medium', 'P3 - Low'],
      },
      {
        value: 'Type',
        items: ['Feature', 'Bug', 'Documentation', 'Maintenance'],
      },
      {
        value: 'Area',
        items: ['Web', 'Mobile', 'API', 'Design System'],
      },
    ]

    return (
      <Field className="w-sm">
        <FieldLabel>Apply label</FieldLabel>
        <Combobox items={groups}>
          <ComboboxInput placeholder="Search labels..." showClear />
          <ComboboxContent>
            <ComboboxEmpty>No labels found.</ComboboxEmpty>
            <ComboboxList>
              {group => (
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {item => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                  <ComboboxSeparator className="group-last/combobox-group:hidden" />
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    )
  },
}
