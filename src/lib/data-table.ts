import { dataTableConfig } from '@/configs/data-table'
import type {
  ExtendedColumnFilter,
  FilterOperator,
  FilterVariant,
} from '@/types/data-table'
import type { Column } from '@tanstack/react-table'
import type { CSSProperties } from 'react'

export function getColumnPinningStyle<TData>({
  column,
  withBorder = false,
  isHeader = false,
}: {
  column: Column<TData>
  withBorder?: boolean
  /** Use on `<th>` so sticky header works (unpinned must be sticky, not relative). */
  isHeader?: boolean
}): CSSProperties {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  const zIndex =
    isHeader && isPinned ? 3 : isHeader ? 2 : isPinned ? 1 : undefined

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? '-4px 0 4px -4px var(--border) inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px var(--border) inset'
          : undefined
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned || isHeader ? 'sticky' : 'relative',
    background: 'var(--background)',
    top: isHeader ? 0 : undefined,
    width: column.getSize(),
    zIndex,
    border: '1px solid var(--border)',
  }
}

export function getFilterOperators(filterVariant: FilterVariant) {
  const operatorMap: Record<
    FilterVariant,
    { label: string; value: FilterOperator }[]
  > = {
    text: dataTableConfig.textOperators,
    number: dataTableConfig.numericOperators,
    range: dataTableConfig.numericOperators,
    date: dataTableConfig.dateOperators,
    dateRange: dataTableConfig.dateOperators,
    boolean: dataTableConfig.booleanOperators,
    select: dataTableConfig.selectOperators,
    multiSelect: dataTableConfig.multiSelectOperators,
  }

  return operatorMap[filterVariant] ?? dataTableConfig.textOperators
}

export function getDefaultFilterOperator(filterVariant: FilterVariant) {
  const operators = getFilterOperators(filterVariant)

  return operators[0]?.value ?? (filterVariant === 'text' ? 'iLike' : 'eq')
}

export function getValidFilters<TData>(
  filters: ExtendedColumnFilter<TData>[]
): ExtendedColumnFilter<TData>[] {
  return filters.filter(
    filter =>
      filter.operator === 'isEmpty' ||
      filter.operator === 'isNotEmpty' ||
      (Array.isArray(filter.value)
        ? filter.value.length > 0
        : filter.value !== '' &&
          filter.value !== null &&
          filter.value !== undefined)
  )
}
