import { Middleware, combineReducers } from '@reduxjs/toolkit'
import { apiSliceAuthenticated } from './api/baseApi'
import { rtkQueryErrorLogger } from './error-handler'
import { breadcrumbsSlice } from './global/breadcrumbs'
import { groupFavoritesSlice } from './global/favorite'

export const reducers = combineReducers({
  apiAuthenticated: apiSliceAuthenticated.reducer,
  breadcrumbsSlice: breadcrumbsSlice.reducer,
  favorites: groupFavoritesSlice.reducer,
})

export const middlewares: Middleware[] = [
  apiSliceAuthenticated.middleware,
  rtkQueryErrorLogger,
]
