import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from './button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import {
  TimePicker,
  TimePickerClear,
  TimePickerContent,
  TimePickerHour,
  TimePickerInput,
  TimePickerInputGroup,
  TimePickerLabel,
  TimePickerMinute,
  TimePickerPeriod,
  TimePickerSecond,
  TimePickerSeparator,
  TimePickerTrigger,
  useTimePicker,
} from './time-picker'

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## TimePicker

The root container component that manages time picker state and context.

### Data Attributes

| Attribute | Value |
|-----------|-------|
| \`[data-disabled]\` | Present when the time picker is disabled. |
| \`[data-invalid]\` | Present when the time picker is invalid. |
| \`[data-readonly]\` | Present when the time picker is read-only. |

---

## TimePickerLabel

The accessible label for the time picker field. Associates with the input group via \`htmlFor\`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

---

## TimePickerInputGroup

The container that wraps all segment inputs and the trigger button. Sets up CSS custom properties for dynamic segment widths.

> **Note:** Use the \`style\` prop to override CSS variables — setting them via \`className\` will not work because the widths are computed from placeholder length at runtime.

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

### Data Attributes

| Attribute | Value |
|-----------|-------|
| \`[data-disabled]\` | Present when the time picker is disabled. |
| \`[data-invalid]\` | Present when the time picker is invalid. |

### CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| \`--time-picker-hour-input-width\` | \`2ch\` | Width of the hour segment input, derived from the hour placeholder length. |
| \`--time-picker-minute-input-width\` | \`2ch\` | Width of the minute segment input, derived from the minute placeholder length. |
| \`--time-picker-second-input-width\` | \`2ch\` | Width of the second segment input, derived from the second placeholder length. |
| \`--time-picker-period-input-width\` | \`2ch\` | Width of the AM/PM segment input, derived from the period placeholder length. |

---

## TimePickerTrigger

The button that opens and closes the time picker popover.

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

### Data Attributes

| Attribute | Value |
|-----------|-------|
| \`[data-state]\` | \`'open'\` or \`'closed'\` |
| \`[data-disabled]\` | Present when the time picker is disabled. |
| \`[data-readonly]\` | Present when the time picker is read-only. |
| \`[data-invalid]\` | Present when the time picker is invalid. |

---

## TimePickerContent

The popover panel that contains the scrollable time selection columns.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`side\` | \`'top' \| 'right' \| 'bottom' \| 'left'\` | \`'bottom'\` | Preferred side for the popover to open. |
| \`align\` | \`'start' \| 'center' \| 'end'\` | \`'start'\` | Alignment of the popover relative to the trigger. |
| \`sideOffset\` | \`number\` | \`4\` | Distance in pixels between the trigger and the popover. |
| \`asChild\` | \`boolean\` | — | Merges props onto the child element. |

### Data Attributes

| Attribute | Value |
|-----------|-------|
| \`[data-state]\` | \`'open'\` or \`'closed'\` |
| \`[data-side]\` | The side where the content is rendered. |
| \`[data-align]\` | The alignment of the content relative to the trigger. |

---

## TimePickerHour

Scrollable column for selecting the hour value.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`format\` | \`'numeric' \| '2-digit'\` | \`'2-digit'\` | Number format for displayed hour values. |
| \`asChild\` | \`boolean\` | — | Merges props onto the child element. |

---

## TimePickerMinute

Scrollable column for selecting the minute value.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`format\` | \`'numeric' \| '2-digit'\` | \`'2-digit'\` | Number format for displayed minute values. |
| \`asChild\` | \`boolean\` | — | Merges props onto the child element. |

---

## TimePickerSecond

Scrollable column for selecting the second value. Only meaningful when \`showSeconds\` is \`true\` on \`TimePicker\`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`format\` | \`'numeric' \| '2-digit'\` | \`'2-digit'\` | Number format for displayed second values. |
| \`asChild\` | \`boolean\` | — | Merges props onto the child element. |

---

## TimePickerPeriod

Scrollable column for selecting AM/PM. Only rendered when the locale uses 12-hour format.

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

---

## TimePickerSeparator

A purely visual separator rendered between segment inputs (e.g. the \`:\` between hours and minutes).

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

---

## TimePickerClear

A button that resets the selected time to an empty state.

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

---

## TimePickerInput

An inline editable segment input for a single time unit (hour, minute, second, or period). Rendered inside \`TimePickerInputGroup\`.

### Props

| Prop | Type | Description |
|------|------|-------------|
| \`segment\` | \`'hour' \| 'minute' \| 'second' \| 'period'\` | **Required.** Which time unit this input controls. |
| \`asChild\` | \`boolean\` | Merges props onto the child element. |

### CSS Variables (per-segment overrides)

| Variable | Description |
|----------|-------------|
| \`--time-picker-hour-input-width\` | Override the width for the hour segment input only. |
| \`--time-picker-minute-input-width\` | Override the width for the minute segment input only. |
| \`--time-picker-second-input-width\` | Override the width for the second segment input only. |
| \`--time-picker-period-input-width\` | Override the width for the period segment input only. |
`,
      },
    },
  },
  tags: ['autodocs'],
  subcomponents: {
    TimePickerContent,
    TimePickerHour,
    TimePickerInput,
    TimePickerInputGroup,
    TimePickerLabel,
    TimePickerMinute,
    TimePickerPeriod,
    TimePickerSecond,
    TimePickerSeparator,
    TimePickerTrigger,
    TimePickerClear,
    useTimePicker,
  },
} satisfies Meta<typeof TimePicker>

export default meta
type TimePickerStory = StoryObj<typeof meta>

export const Default: TimePickerStory = {
  render: () => {
    return (
      <TimePicker className="w-[280px]">
        <TimePickerLabel>Select Time</TimePickerLabel>
        <TimePickerInputGroup>
          <TimePickerInput segment="hour" />
          <TimePickerSeparator />
          <TimePickerInput segment="minute" />
          <TimePickerInput segment="period" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
          <TimePickerPeriod />
        </TimePickerContent>
      </TimePicker>
    )
  },
}

export const WithStep: TimePickerStory = {
  render: () => {
    return (
      <TimePicker
        className="w-[280px]"
        defaultValue="10:00"
        minuteStep={15}
        secondStep={10}
      >
        <TimePickerLabel>Meeting Time (15 min intervals)</TimePickerLabel>
        <TimePickerInputGroup>
          <TimePickerInput segment="hour" />
          <TimePickerSeparator />
          <TimePickerInput segment="minute" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
          <TimePickerSecond />
        </TimePickerContent>
      </TimePicker>
    )
  },
}

export const WithSeconds: TimePickerStory = {
  render: () => {
    return (
      <TimePicker defaultValue="14:30:45" className="w-[280px]" showSeconds>
        <TimePickerLabel>Select Time with Seconds</TimePickerLabel>
        <TimePickerInputGroup>
          <TimePickerInput segment="hour" />
          <TimePickerSeparator />
          <TimePickerInput segment="minute" />
          <TimePickerSeparator />
          <TimePickerInput segment="second" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
          <TimePickerSecond />
        </TimePickerContent>
      </TimePicker>
    )
  },
}

export const CustomPlaceholders: TimePickerStory = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <TimePicker className="w-[280px]" segmentPlaceholder="--">
          <TimePickerLabel>Default (--)</TimePickerLabel>
          <TimePickerInputGroup>
            <TimePickerInput segment="hour" />
            <TimePickerSeparator />
            <TimePickerInput segment="minute" />
            <TimePickerInput segment="period" />
            <TimePickerTrigger />
          </TimePickerInputGroup>
          <TimePickerContent>
            <TimePickerHour />
            <TimePickerMinute />
            <TimePickerPeriod />
          </TimePickerContent>
        </TimePicker>

        <TimePicker
          className="w-[280px]"
          segmentPlaceholder={{ hour: 'hh', minute: 'mm', period: 'aa' }}
        >
          <TimePickerLabel>Custom (hh:mm aa)</TimePickerLabel>
          <TimePickerInputGroup>
            <TimePickerInput segment="hour" />
            <TimePickerSeparator />
            <TimePickerInput segment="minute" />
            <TimePickerInput segment="period" />
            <TimePickerTrigger />
          </TimePickerInputGroup>
          <TimePickerContent>
            <TimePickerHour />
            <TimePickerMinute />
            <TimePickerPeriod />
          </TimePickerContent>
        </TimePicker>
      </div>
    )
  },
}

export const OnFocus: TimePickerStory = {
  render: () => {
    return (
      <TimePicker className="w-[280px]" openOnFocus>
        <TimePickerLabel>Meeting Time</TimePickerLabel>
        <TimePickerInputGroup>
          <TimePickerInput segment="hour" />
          <TimePickerSeparator />
          <TimePickerInput segment="minute" />
          <TimePickerInput segment="period" />
          <TimePickerTrigger />
        </TimePickerInputGroup>
        <TimePickerContent>
          <TimePickerHour />
          <TimePickerMinute />
          <TimePickerPeriod />
        </TimePickerContent>
      </TimePicker>
    )
  },
}

export const InputGroupClickAction: TimePickerStory = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <TimePicker className="w-[280px]">
            <TimePickerLabel>Click empty space to focus</TimePickerLabel>
            <TimePickerInputGroup>
              <TimePickerInput segment="hour" />
              <TimePickerSeparator />
              <TimePickerInput segment="minute" />
              <TimePickerInput segment="period" />
              <TimePickerTrigger />
            </TimePickerInputGroup>
            <TimePickerContent>
              <TimePickerHour />
              <TimePickerMinute />
              <TimePickerPeriod />
            </TimePickerContent>
          </TimePicker>
        </div>

        <div className="flex flex-col gap-4">
          <TimePicker className="w-[280px]" inputGroupClickAction="open">
            <TimePickerLabel>Click empty space to open popover</TimePickerLabel>
            <TimePickerInputGroup>
              <TimePickerInput segment="hour" />
              <TimePickerSeparator />
              <TimePickerInput segment="minute" />
              <TimePickerInput segment="period" />
              <TimePickerTrigger />
            </TimePickerInputGroup>
            <TimePickerContent>
              <TimePickerHour />
              <TimePickerMinute />
              <TimePickerPeriod />
            </TimePickerContent>
          </TimePicker>
        </div>
      </div>
    )
  },
}

// Controlled State
export const ControlledState: TimePickerStory = {
  render: () => {
    const [value, setValue] = useState('14:30')

    return (
      <div className="flex flex-col gap-4">
        <TimePicker
          className="w-[280px]"
          value={value}
          onValueChange={setValue}
        >
          <TimePickerLabel>Controlled Time Picker</TimePickerLabel>
          <TimePickerInputGroup>
            <TimePickerInput segment="hour" />
            <TimePickerSeparator />
            <TimePickerInput segment="minute" />
            <TimePickerTrigger />
          </TimePickerInputGroup>
          <TimePickerContent>
            <TimePickerHour />
            <TimePickerMinute />
          </TimePickerContent>
        </TimePicker>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setValue('09:00')}>
            Set 9:00 AM
          </Button>
          <Button variant="outline" size="sm" onClick={() => setValue('14:30')}>
            Set 2:30 PM
          </Button>
          <Button variant="outline" size="sm" onClick={() => setValue('')}>
            Clear
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Selected time:{' '}
          <span className="font-mono font-semibold">{value || 'None'}</span>
        </div>
      </div>
    )
  },
}

// With Form
export const WithForm: TimePickerStory = {
  render: () => {
    const form = useForm<{ appointmentTime: string }>({
      resolver: zodResolver(z.object({ appointmentTime: z.string() })),
      defaultValues: {
        appointmentTime: '09:00',
      },
    })

    const onSubmit = useCallback((data: { appointmentTime: string }) => {
      alert(`Appointment scheduled for: ${data.appointmentTime}`)
    }, [])

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)} form={form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[280px] flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="appointmentTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment time</FormLabel>
                <FormControl>
                  <TimePicker
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-[280px]"
                  >
                    <TimePickerInputGroup>
                      <TimePickerInput segment="hour" />
                      <TimePickerSeparator />
                      <TimePickerInput segment="minute" />
                      <TimePickerInput segment="period" />
                      <TimePickerTrigger />
                    </TimePickerInputGroup>
                    <TimePickerContent>
                      <TimePickerHour />
                      <TimePickerMinute />
                      <TimePickerPeriod />
                    </TimePickerContent>
                  </TimePicker>
                </FormControl>
                <FormDescription>
                  Select your preferred appointment time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Schedule appointment</Button>
        </form>
      </Form>
    )
  },
}
