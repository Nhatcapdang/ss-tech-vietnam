import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { useForm } from 'react-hook-form'
import { Button } from './button'
import { Form, FormField } from './form'
import { Label } from './label'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from './number-field'

const meta = {
  title: 'UI/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    min: {
      control: 'number',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      defaultValue: 100,
    },
    step: {
      control: 'number',
      defaultValue: 1,
    },
  },
} satisfies Meta<typeof NumberField>

export default meta

type NumberFieldStory = StoryObj<typeof meta>

export const NumberFieldStory: NumberFieldStory = {
  render: args => (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={args.id}>Quantity</Label>
      <NumberField
        defaultValue={0}
        size="sm"
        {...args}
        format={{ currency: 'USD', style: 'currency' }}
      >
        <NumberFieldGroup id={args.id}>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
}

export const NumberFieldWithScrubAreaStory: NumberFieldStory = {
  render: args => (
    <div className="flex flex-col items-start gap-2">
      <NumberField defaultValue={0} size="sm" {...args}>
        <NumberFieldScrubArea label="Quantity" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
}

export const NumberFieldWithFormatStory: NumberFieldStory = {
  render: args => (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={args.id}>Quantity</Label>
      <NumberField
        defaultValue={0}
        size="sm"
        {...args}
        format={{ currency: 'USD', style: 'currency' }}
      >
        <NumberFieldGroup id={args.id}>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
}

export const FormIntegrationStory: NumberFieldStory = {
  render: () => {
    const form = useForm<{ quantity: number }>({
      defaultValues: { quantity: 1 },
    })
    return (
      <Form
        className="flex max-w-64 flex-col items-start gap-2"
        onSubmit={form.handleSubmit(data => console.log(data))}
        form={form}
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <NumberField max={100} min={1}>
              <NumberFieldScrubArea label="Quantity" />
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput {...field} />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          )}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  },
}
