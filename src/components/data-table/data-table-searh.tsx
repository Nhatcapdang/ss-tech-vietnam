'use client'

import type { Table } from '@tanstack/react-table'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from '@/hooks/use-debounced-callback'
import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useState } from 'react'

interface DataTableSearchProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>
}

export function DataTableSearch<TData>({}: DataTableSearchProps<TData>) {
  const [keyword, setKeyword] = useQueryState(
    'keyword',
    parseAsString.withDefault('')
  )
  const [value, setValue] = useState<string>(keyword)

  const handleSearchChangeCallback = useDebouncedCallback((value: string) => {
    setKeyword(value)
  }, 500)

  const handleSearchChange = useCallback(
    (value: string) => {
      setValue(value)
      handleSearchChangeCallback(value)
    },
    [handleSearchChangeCallback, setValue]
  )

  return (
    <Input
      placeholder="Typing something..."
      value={value}
      onChange={event => handleSearchChange(event.target.value)}
      className="h-8 w-40 lg:w-56"
    />
  )
}
