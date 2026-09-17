import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { addDays, format, isValid, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Button } from './button'
import { Calendar, CalendarDropdown } from './calendar'
import { Field, FieldLabel } from './field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type CalendarStory = StoryObj<typeof meta>

export const Default: CalendarStory = {
  render: () => <Calendar />,
}

// Date Range Picker
export const DateRangePicker: CalendarStory = {
  render: () => {
    const [date, setDate] = useState<DateRange | undefined>()
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start" variant="outline">
            <CalendarIcon aria-hidden="true" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            defaultMonth={date?.from}
            mode="range"
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    )
  },
}

export const WithDropdownNavigation: CalendarStory = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const id = useId()
    return (
      <Field>
        <FieldLabel htmlFor={id}>Start date</FieldLabel>
        <Popover>
          <PopoverTrigger id={id} asChild>
            <Button className="w-full justify-start" variant="outline">
              <CalendarIcon aria-hidden="true" />
              {date ? format(date, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              captionLayout="dropdown"
              components={{ Dropdown: CalendarDropdown }}
              defaultMonth={date}
              endMonth={new Date()}
              mode="single"
              onSelect={setDate}
              selected={date}
              startMonth={new Date(1900, 0)}
            />
          </PopoverContent>
        </Popover>
      </Field>
    )
  },
}

export const WithPresets: CalendarStory = {
  render: () => {
    const today = new Date()
    const [month, setMonth] = useState(today)
    const [date, setDate] = useState<Date | undefined>(today)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start" variant="outline">
            <CalendarIcon aria-hidden="true" />
            {date ? format(date, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="flex max-sm:flex-col">
            <div className="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
              <div className="flex h-full flex-col sm:border-e sm:pe-3">
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    setDate(today)
                    setMonth(today)
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Today
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    const tomorrow = addDays(today, 1)
                    setDate(tomorrow)
                    setMonth(tomorrow)
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Tomorrow
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    const in3Days = addDays(today, 3)
                    setDate(in3Days)
                    setMonth(in3Days)
                  }}
                  size="sm"
                  variant="ghost"
                >
                  In 3 days
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    const inAWeek = addDays(today, 7)
                    setDate(inAWeek)
                    setMonth(inAWeek)
                  }}
                  size="sm"
                  variant="ghost"
                >
                  In a week
                </Button>
              </div>
            </div>
            <Calendar
              className="max-sm:pb-3 sm:ps-2"
              mode="single"
              month={month}
              onMonthChange={setMonth}
              onSelect={setDate}
              selected={date}
            />
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const WithInput: CalendarStory = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const [inputValue, setInputValue] = useState('')
    const [month, setMonth] = useState<Date>(() => new Date())
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      if (value) {
        const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
        if (isValid(parsedDate)) {
          setDate(parsedDate)
          setMonth(parsedDate)
        }
      } else {
        setDate(undefined)
      }
    }
    const handleSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      if (selectedDate) {
        setInputValue(format(selectedDate, 'yyyy-MM-dd'))
        setMonth(selectedDate)
      } else {
        setInputValue('')
      }
    }
    return (
      <Popover>
        <InputGroup>
          <InputGroupInput
            aria-label="Select date"
            onChange={handleInputChange}
            onClick={e => e.stopPropagation()}
            value={inputValue}
          />
          <InputGroupAddon>
            <PopoverTrigger asChild>
              <Button aria-label="Select date" size="icon-xs" variant="ghost">
                <CalendarIcon aria-hidden="true" />
              </Button>
            </PopoverTrigger>
          </InputGroupAddon>
        </InputGroup>
        <PopoverContent align="start" alignOffset={-4} sideOffset={8}>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelect}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    )
  },
}
