import { flexRender, type Table as TanstackTable } from '@tanstack/react-table'
import type * as React from 'react'

import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getColumnPinningStyle } from '@/lib/data-table'
import { cn } from '@/lib/utils'
import { Spinner } from '../ui/spinner'

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>
  actionBar?: React.ReactNode
  isLoading?: boolean
}
/**
 *
 * @example
 * <DataTable table={table} actionBar={<ClientsTableActionBar table={table} />}
 *  className="**:data-[slot=table-container]:max-h-[calc(100vh-210px)]"
 * >
 *   <DataTableAdvancedToolbar table={table}>
 *     <DataTableFilterMenu table={table} />
 *     <DataTableFilterList table={table} />
 *   </DataTableAdvancedToolbar>
 *   <DataTableToolbar table={table}>
 *     <DataTableSortList table={table} align="end" />
 *   </DataTableToolbar>
 * </DataTable>
 */
export function DataTable<TData>({
  isLoading,
  table,
  actionBar,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2.5 overflow-auto [--data-table-height:300px] **:data-[slot=table-container]:max-h-(--data-table-height) **:data-[slot=table-container]:min-h-(--data-table-height) **:data-[slot=table-container]:border',
        className
      )}
      {...props}
    >
      {children}
      <div className="grid w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="*:whitespace-nowrap last:border-r-0 [&>th]:border-r"
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getColumnPinningStyle({
                        column: header.column,
                        isHeader: true,
                      }),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-hidden">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-[calc(var(--data-table-height)-50px)] w-full"
                >
                  <Spinner className="mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="*:border-r *:whitespace-nowrap last:border-r-0 odd:bg-muted/50"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...getColumnPinningStyle({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-screen w-full text-center"
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  )
}
