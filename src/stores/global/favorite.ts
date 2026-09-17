import { Country } from '@/types/countries'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type GroupFavorite = {
  id: string
  name: string
  favorites: Country[]
}

const initialState: GroupFavorite[] = [
  {
    id: 'default',
    name: 'Favorite',
    favorites: [],
  },
]

export const groupFavoritesSlice = createSlice({
  name: 'groupFavoritesSlice',
  initialState,
  reducers: {
    addGroupFavorite: (
      state,
      action: PayloadAction<{ name: string; favorites?: Country[] }>
    ) => {
      state.push({
        id: crypto.randomUUID(),
        name: action.payload.name,
        favorites: action.payload.favorites ?? [],
      })
    },
    renameGroupFavorite: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const group = state.find(group => group.id === action.payload.id)
      if (!group) return

      group.name = action.payload.name
    },
    removeGroupFavorite: (state, action: PayloadAction<string>) => {
      return state.filter(group => group.id !== action.payload)
    },
    // Add the uuid to the group when it doesn't exist yet, otherwise
    // remove it — keeps a row's membership in a group in sync with a
    // single checkbox toggle.
    toggleGroupFavorite: (
      state,
      action: PayloadAction<{ id: string; favorite: Country }>
    ) => {
      const group = state.find(group => group.id === action.payload.id)
      if (!group) return

      const uuidIndex = group.favorites.findIndex(
        favorite => favorite.uuid === action.payload.favorite.uuid
      )
      if (uuidIndex >= 0) {
        group.favorites.splice(uuidIndex, 1)
      } else {
        group.favorites.push(action.payload.favorite)
      }
    },
    // Remove the uuid from every group so a row shows as fully
    // unfavorited (star unfilled), regardless of how many groups it
    // currently belongs to.
    resetFavorite: (state, action: PayloadAction<string>) => {
      for (const group of state) {
        const uuidIndex = group.favorites.findIndex(
          favorite => favorite.uuid === action.payload
        )
        if (uuidIndex >= 0) {
          group.favorites.splice(uuidIndex, 1)
        }
      }
    },
  },
})

export const {
  addGroupFavorite,
  renameGroupFavorite,
  removeGroupFavorite,
  toggleGroupFavorite,
  resetFavorite,
} = groupFavoritesSlice.actions
