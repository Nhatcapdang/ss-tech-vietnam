'use client'

import { useDataTable } from '@/hooks/use-data-table'
import { cn } from '@/lib/utils'
import { useGetCountriesQuery } from '@/stores/api/countries/countries-api'
import { useAppSelector } from '@/stores/hooks'
import { Country } from '@/types/countries'
import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { DataTable, DataTableViewOptions } from '../data-table'
import { DataTableSearch } from '../data-table/data-table-searh'
import { CountriesTableColumns } from './countries-table-column'
import { FavoriteFilter } from './favorite-filter'

function Countries() {
  const [query] = useQueryState('keyword', parseAsString.withDefault(''))
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(25))
  const [favoriteGroupId] = useQueryState(
    'favoriteGroupId',
    parseAsString.withDefault('')
  )
  const favorites = useAppSelector(state => state.favorites)
  const { data: countries, isFetching } = useGetCountriesQuery({
    q: query,
    offset: (page - 1) * perPage,
    limit: perPage,
  })

  const columns = useMemo<ColumnDef<Country>[]>(
    () => CountriesTableColumns(),
    []
  )
  const pageCount = useMemo(() => {
    return Math.ceil((countries?.data.meta.total ?? 0) / perPage)
  }, [countries?.data.meta.total, perPage])

  const favoriteGroup = useMemo(
    () => favorites.find(group => group.id === favoriteGroupId),
    [favorites, favoriteGroupId]
  )

  const data = useMemo(() => {
    return favoriteGroup?.favorites ?? countries?.data.objects ?? []
  }, [favoriteGroup?.favorites, countries?.data.objects])

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      columnPinning: { left: ['select', 'actions', 'code'] },
      pagination: {
        pageIndex: 0,
        pageSize: perPage,
      },
    },
    getRowId: row => row.uuid.toString(),
  })

  return (
    <div>
      <div className="data-table-container p-4">
        <DataTable
          isLoading={isFetching}
          table={table}
          className="[--data-table-height:calc(100vh-450px)]"
        >
          <div
            role="toolbar"
            aria-orientation="horizontal"
            className={cn('flex w-full items-start justify-between gap-2 p-1')}
          >
            <DataTableSearch table={table} />
            <FavoriteFilter />
            <DataTableViewOptions table={table} align="end" />
          </div>
        </DataTable>
      </div>
    </div>
  )
}

export default Countries
