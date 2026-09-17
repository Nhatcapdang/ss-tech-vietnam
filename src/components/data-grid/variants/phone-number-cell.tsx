import { PhoneInput } from '@/components/ui/phone-input'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { DataGridCellProps } from '@/types/data-grid'
import { useCallback, useRef, useState } from 'react'
import { DataGridCellWrapper } from '../data-grid-cell-wrapper'

export function PhoneNumberCell<TData>({
  cell,
  tableMeta,
  rowIndex,
  columnId,
  rowHeight,
  isEditing,
  isFocused,
  isSelected,
  isSearchMatch,
  isActiveSearchMatch,
  readOnly,
}: DataGridCellProps<TData>) {
  const initialValue = cell.getValue() as string
  const [value, setValue] = useState(initialValue ?? '')

  const prevInitialValueRef = useRef(initialValue)
  useIsomorphicLayoutEffect(() => {
    prevInitialValueRef.current = initialValue
    setValue(initialValue ?? '')
  }, [initialValue])

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue)
      if (!readOnly) {
        tableMeta?.onDataUpdate?.({ rowIndex, columnId, value: newValue })
      }
    },
    [tableMeta, rowIndex, columnId, readOnly]
  )

  const onWrapperKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isEditing) {
        if (event.key === 'Escape') {
          event.preventDefault()
          setValue(initialValue)
          tableMeta?.onCellEditingStop?.()
        } else if (event.key === 'Enter' || event.key === 'Tab') {
          event.preventDefault()
          tableMeta?.onCellEditingStop?.({
            direction:
              event.key === 'Tab'
                ? event.shiftKey
                  ? 'left'
                  : 'right'
                : undefined,
            moveToNextRow: event.key === 'Enter',
          })
        }
      }
    },
    [isEditing, initialValue, tableMeta]
  )

  return (
    <DataGridCellWrapper<TData>
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
      {isEditing ? (
        <PhoneInput
          value={value}
          disabled={readOnly}
          onChange={handleChange}
          className="h-full w-full border-0 shadow-none"
        />
      ) : (
        <div
          data-slot="grid-cell-content"
          className="size-full overflow-hidden text-sm"
        >
          {value}
        </div>
      )}
    </DataGridCellWrapper>
  )
}
