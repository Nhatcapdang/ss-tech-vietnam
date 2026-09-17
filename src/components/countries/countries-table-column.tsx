'use client'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from '@/i18n/navigation'
import { Country } from '@/types/countries'
import {
  type CellContext,
  type Column,
  type ColumnDef,
} from '@tanstack/react-table'
import { Text } from 'lucide-react'
import { Badge } from '../ui/badge'
import { BadgeOverflow } from '../ui/badge-overflow'
import { Favorite } from './favorite'

export function CountriesTableColumns(): ColumnDef<Country>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      maxSize: 35,
    },
    {
      id: 'favorite',
      maxSize: 20,
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Favorite" />
      ),
      meta: {
        label: 'Favorite',
        variant: 'boolean',
      },
      cell: (props: CellContext<Country, unknown>) => (
        <Favorite row={props.row} />
      ),
    },
    {
      id: 'government_type',
      accessorKey: 'government_type',
      enableSorting: false,
      enableHiding: false,
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Government Type" />
      ),
      meta: {
        label: 'Government Type',
        placeholder: 'Search names...',
        variant: 'text',
        icon: Text,
      },
      cell(props) {
        return (
          <div className="max-w-37.5 truncate" title={props.getValue<string>()}>
            {props.getValue<string>()}
          </div>
        )
      },
    },
    {
      id: 'region',
      accessorKey: 'region',
      enableSorting: false,
      enableHiding: false,
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Region" />
      ),
      meta: {
        label: 'Region',
        variant: 'text',
      },
    },
    {
      id: 'subregion',
      accessorKey: 'subregion',
      enableSorting: false,
      enableHiding: false,
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Subregion" />
      ),
      meta: {
        label: 'Subregion',
        variant: 'text',
      },
    },
    {
      id: 'timezones',
      accessorKey: 'timezones',
      enableSorting: false,
      enableHiding: false,
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Timezones" />
      ),
      meta: {
        label: 'Timezones',
        variant: 'text',
      },
      cell(props) {
        const timezones = props.getValue<Country['timezones']>()
        return (
          <BadgeOverflow
            className="w-55"
            items={timezones}
            lineCount={1}
            renderBadge={(_, label) => (
              <Badge variant="secondary">{label}</Badge>
            )}
          />
        )
      },
    },
    {
      id: 'links',
      accessorKey: 'links',
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Links" />
      ),
      cell(props) {
        const links = props.getValue<Country['links']>()
        return (
          <div className="flex gap-2">
            <Link
              href={links.google_maps}
              target="_blank"
              className="max-w-37.5 truncate text-blue-400 hover:underline"
              title={links.google_maps}
            >
              Google Maps
            </Link>
            <Link
              href={links.official}
              target="_blank"
              className="max-w-37.5 truncate text-blue-400 hover:underline"
              title={links.official}
            >
              Official
            </Link>
            <Link
              href={links.wikipedia}
              target="_blank"
              className="max-w-37.5 truncate text-blue-400 hover:underline"
              title={links.wikipedia}
            >
              Wikipedia
            </Link>
            <Link
              href={links.wikipedia}
              target="_blank"
              className="max-w-37.5 truncate text-blue-400 hover:underline"
              title={links.wikipedia}
            >
              Open Street Maps
            </Link>
          </div>
        )
      },
      enableSorting: false,
      maxSize: 35,
    },
    {
      id: 'descriptions',
      accessorKey: 'descriptions.long',
      header: ({ column }: { column: Column<Country, unknown> }) => (
        <DataTableColumnHeader column={column} label="Description" />
      ),
      enableSorting: false,
      meta: {
        label: 'Description',
        variant: 'text',
      },
      cell(props) {
        return (
          <div
            className="line-clamp-2 max-w-37.5 truncate"
            title={props.getValue<string>()}
          >
            {props.getValue<string>()}
          </div>
        )
      },
    },
  ]
}
