import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CopyIcon, GlobeIcon, InfoIcon, Loader2Icon } from 'lucide-react'
import { Button } from './button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group'
import { Label } from './label'
import { NumberField, NumberFieldInput } from './number-field'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

const meta = {
  title: 'Components/InputGroup',
  tags: ['autodocs'],
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputGroup>

export default meta
type InputGroupStory = StoryObj<typeof meta>

export const Default: InputGroupStory = {
  render: () => <InputGroup />,
}

export const WithAddon: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <GlobeIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Website" placeholder="Website" type="url" />
      <InputGroupAddon>
        <GlobeIcon aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithStartText: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupInput
        aria-label="Set your URL"
        className="*:[input]:ps-0!"
        placeholder="coss"
        type="search"
      />
      <InputGroupAddon>
        <InputGroupText>i.cal.com/</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithEndText: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupInput
        aria-label="Choose a username"
        placeholder="Choose a username"
        type="text"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>@coss.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithStartandEndText: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupInput
        aria-label="Enter your domain"
        className="*:[input]:px-0!"
        placeholder="coss"
        type="text"
      />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithTooltip: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupInput
        aria-label="Password"
        placeholder="Password"
        type="password"
      />
      <InputGroupAddon align="inline-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              aria-label="Password requirements"
              size="icon-xs"
              variant="ghost"
            >
              <InfoIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Min. 8 characters</p>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithButton: InputGroupStory = {
  render: () => {
    return (
      <InputGroup>
        <InputGroupInput
          aria-label="Url"
          defaultValue="https://coss.com"
          type="text"
        />
        <InputGroupAddon align="inline-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Copy" size="icon-xs" variant="ghost">
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InputGroupAddon>
      </InputGroup>
    )
  },
}

export const WithInnerLabel: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupInput id="email-1" placeholder="team@coss.com" type="email" />
      <InputGroupAddon align="block-start">
        <Label className="text-foreground" htmlFor="email-1">
          Email
        </Label>
        <Popover>
          <PopoverTrigger className="ml-auto" asChild>
            <div className="ml-auto">
              <Button className="-m-1" size="icon-xs" variant="ghost">
                <InfoIcon />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <p>We&apos;ll use this to send you notifications</p>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithLoader: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupInput disabled placeholder="Searching…" type="search" />
      <InputGroupAddon align="inline-end">
        <Loader2Icon className="animate-spin" />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithNumberField: InputGroupStory = {
  render: () => (
    <InputGroup>
      <NumberField aria-label="Enter the amount" defaultValue={10}>
        <NumberFieldInput className="text-left" />
      </NumberField>
      <InputGroupAddon>
        <InputGroupText>€</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>EUR</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithTextarea: InputGroupStory = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Ask, Search or Chat…" />
    </InputGroup>
  ),
}
