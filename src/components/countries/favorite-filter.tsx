'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/stores/hooks'
import { StarIcon } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useCallback } from 'react'

export function FavoriteFilter() {
  const groups = useAppSelector(state => state.favorites)
  const [favoriteGroupId, setFavoriteGroupId] = useQueryState(
    'favoriteGroupId',
    parseAsString.withDefault('')
  )

  const selectedGroup = groups.find(group => group.id === favoriteGroupId)

  const handleSelectGroup = useCallback(
    (groupId: string) => {
      void setFavoriteGroupId(current => (current === groupId ? '' : groupId))
    },
    [setFavoriteGroupId]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 font-normal"
          size="sm"
          variant={selectedGroup ? 'secondary' : 'outline'}
        >
          <StarIcon
            aria-hidden="true"
            className="text-yellow-500"
            fill={selectedGroup ? 'currentColor' : 'none'}
          />
          {selectedGroup ? selectedGroup.name : 'Favorite'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Filter by group</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {groups.length === 0 ? (
          <p className="px-2 py-3 text-center text-xs text-muted-foreground">
            No favorite groups yet.
          </p>
        ) : (
          groups.map(group => (
            <DropdownMenuCheckboxItem
              checked={favoriteGroupId === group.id}
              key={group.id}
              onCheckedChange={() => handleSelectGroup(group.id)}
              onSelect={event => event.preventDefault()}
            >
              <span className="flex-1 truncate">{group.name}</span>
              <span className="text-xs text-muted-foreground">
                {group.favorites.length}
              </span>
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
