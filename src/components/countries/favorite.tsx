'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  addGroupFavorite,
  removeGroupFavorite,
  renameGroupFavorite,
  resetFavorite,
  toggleGroupFavorite,
  type GroupFavorite,
} from '@/stores/global/favorite'
import { useAppDispatch, useAppSelector } from '@/stores/hooks'
import { Country } from '@/types/countries'
import { Row } from '@tanstack/react-table'
import { PlusIcon, StarIcon, Trash2Icon } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useCallback, useState } from 'react'

export function Favorite({ row }: { row: Row<Country> }) {
  const [newGroupName, setNewGroupName] = useState('')
  const [groupToDelete, setGroupToDelete] = useState<GroupFavorite | null>(null)
  const groups = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()

  const rowFavorite = row.original
  const isFavorited = groups.some(group =>
    group.favorites.some(favorite => favorite.uuid === rowFavorite.uuid)
  )

  const handleAddGroup = useCallback(() => {
    const trimmedName = newGroupName.trim()
    if (!trimmedName) return

    dispatch(addGroupFavorite({ name: trimmedName, favorites: [rowFavorite] }))
    setNewGroupName('')
  }, [dispatch, newGroupName, rowFavorite])

  const handleNewGroupKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      handleAddGroup()
    },
    [handleAddGroup]
  )

  const handleToggleGroup = useCallback(
    (groupId: string, favorite: Country) => {
      dispatch(toggleGroupFavorite({ id: groupId, favorite }))
    },
    [dispatch]
  )

  const handleRenameGroup = useCallback(
    (groupId: string, name: string) => {
      dispatch(renameGroupFavorite({ id: groupId, name }))
    },
    [dispatch]
  )

  const handleRequestRemoveGroup = useCallback((group: GroupFavorite) => {
    setGroupToDelete(group)
  }, [])

  const handleConfirmRemoveGroup = useCallback(() => {
    if (!groupToDelete) return

    dispatch(removeGroupFavorite(groupToDelete.id))
    setGroupToDelete(null)
  }, [dispatch, groupToDelete])

  const handleClearFavorite = useCallback(() => {
    dispatch(resetFavorite(rowFavorite.uuid))
  }, [dispatch, rowFavorite])

  const pendingFavoriteCount = groupToDelete?.favorites.length ?? 0

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Manage favorite groups">
          <StarIcon
            aria-hidden="true"
            className="size-4 cursor-pointer text-yellow-500"
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuItem
            onClick={handleClearFavorite}
            onSelect={event => event.preventDefault()}
            variant="destructive"
          >
            Reset Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {groups.length === 0 ? (
            <p className="px-2 py-3 text-center text-xs text-muted-foreground">
              No groups yet. Add one below.
            </p>
          ) : (
            groups.map(group => (
              <DropdownMenuItem
                className="gap-2"
                key={group.id}
                onSelect={event => event.preventDefault()}
              >
                <Checkbox
                  aria-label={`Toggle favorite in ${group.name}`}
                  checked={group.favorites.some(
                    favorite => favorite.uuid === rowFavorite.uuid
                  )}
                  onCheckedChange={() =>
                    handleToggleGroup(group.id, rowFavorite)
                  }
                />
                <Input
                  aria-label="Group name"
                  className="h-7 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-1"
                  maxLength={50}
                  onChange={event =>
                    handleRenameGroup(group.id, event.target.value)
                  }
                  placeholder="e.g. Trade Partners"
                  type="text"
                  value={group.name}
                />
                <Button
                  aria-label={`Delete ${group.name} group`}
                  onClick={() => handleRequestRemoveGroup(group)}
                  size="icon-xs"
                  type="button"
                  variant="ghost"
                >
                  <Trash2Icon aria-hidden="true" />
                </Button>
              </DropdownMenuItem>
            ))
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={event => event.preventDefault()}>
            <InputGroup>
              <InputGroupInput
                aria-label="New group name"
                maxLength={50}
                onChange={event => setNewGroupName(event.target.value)}
                onKeyDown={handleNewGroupKeyDown}
                placeholder="e.g. Trade Partners"
                type="text"
                value={newGroupName}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Add group"
                  disabled={!newGroupName.trim()}
                  onClick={handleAddGroup}
                  type="button"
                  variant="secondary"
                >
                  <PlusIcon aria-hidden="true" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        onOpenChange={open => {
          if (!open) setGroupToDelete(null)
        }}
        open={groupToDelete !== null}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{groupToDelete?.name}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this group and unfavorite{' '}
              {pendingFavoriteCount}{' '}
              {pendingFavoriteCount === 1 ? 'country' : 'countries'} in it. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: 'destructive' })}
              onClick={handleConfirmRemoveGroup}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
