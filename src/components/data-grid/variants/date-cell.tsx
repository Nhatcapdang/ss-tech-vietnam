'use client'

import { DataGridCellWrapper } from '@/components/data-grid/data-grid-cell-wrapper'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import {
  formatDateForDisplay,
  formatDateToString,
  parseLocalDate,
} from '@/lib/data-grid'
import type { DataGridCellProps } from '@/types/data-grid'
import * as React from 'react'

export function DateCell<TData>({
  cell,
  tableMeta,
  rowIndex,
  columnId,
  rowHeight,
  isFocused,
  isEditing,
  isSelected,
  isSearchMatch,
  isActiveSearchMatch,
  readOnly,
}: DataGridCellProps<TData>) {
  const initialValue = cell.getValue() as string
  const [value, setValue] = React.useState(initialValue ?? '')
  const containerRef = React.useRef<HTMLDivElement>(null)

  const prevInitialValueRef = React.useRef(initialValue)

  useIsomorphicLayoutEffect(() => {
    prevInitialValueRef.current = initialValue
    setValue(initialValue ?? '')
  }, [initialValue])

  // Parse date as local time to avoid timezone shifts
  const selectedDate = value ? (parseLocalDate(value) ?? undefined) : undefined

  const onDateSelect = React.useCallback(
    (date: Date | undefined) => {
      if (!date || readOnly) return

      // Format using local date components to avoid timezone issues
      const formattedDate = formatDateToString(date)
      setValue(formattedDate)
      tableMeta?.onDataUpdate?.({ rowIndex, columnId, value: formattedDate })
      tableMeta?.onCellEditingStop?.()
    },
    [tableMeta, rowIndex, columnId, readOnly]
  )

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (open && !readOnly) {
        tableMeta?.onCellEditingStart?.(rowIndex, columnId)
      } else {
        tableMeta?.onCellEditingStop?.()
      }
    },
    [tableMeta, rowIndex, columnId, readOnly]
  )

  const onWrapperKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isEditing && event.key === 'Escape') {
        event.preventDefault()
        setValue(initialValue)
        tableMeta?.onCellEditingStop?.()
      } else if (isFocused && event.key === 'Tab') {
        event.preventDefault()
        tableMeta?.onCellEditingStop?.({
          direction: event.shiftKey ? 'left' : 'right',
        })
      }
    },
    [isEditing, isFocused, initialValue, tableMeta]
  )

  return (
    <DataGridCellWrapper<TData>
      ref={containerRef}
      cell={cell}
      tableMeta={tableMeta}
      rowIndex={rowIndex}
      columnId={columnId}
      rowHeight={rowHeight}
      isEditing={isEditing}
      isFocused={isFocused}
      isSelected={isSelected}
      isSearchMatch={isSearchMatch}
      isActiveSearchMatch={isActiveSearchMatch}
      readOnly={readOnly}
      onKeyDown={onWrapperKeyDown}
    >
      <Popover open={isEditing} onOpenChange={onOpenChange}>
        <PopoverAnchor data-slot="grid-cell-content">
          {formatDateForDisplay(value)}
        </PopoverAnchor>
        {isEditing && (
          <PopoverContent
            data-grid-cell-editor=""
            align="start"
            alignOffset={-8}
            className="w-auto p-0"
          >
            <Calendar
              autoFocus
              captionLayout="dropdown"
              mode="single"
              defaultMonth={selectedDate ?? new Date()}
              selected={selectedDate}
              onSelect={onDateSelect}
            />
          </PopoverContent>
        )}
      </Popover>
    </DataGridCellWrapper>
  )
}
