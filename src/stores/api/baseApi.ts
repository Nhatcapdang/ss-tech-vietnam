import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.restcountries.com',
  headers: {
    // TODO: Remove this after testing, it should put in the environment variable
    Authorization: 'Bearer rc_live_a1e398da264e4393bef943ca1416b348',
  },
})

const authenticatedBaseQuery = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions)

  // if (result.error?.status === 403) {
  //   api.dispatch(setForbidden())
  //   return result
  // }

  // if (result.error?.status === 401) {
  //   const refreshResult = await baseQuery('/refresh-token', api, extraOptions)
  //   if (refreshResult.data) {
  //     result = await baseQuery(args, api, extraOptions)
  //   } else {
  //     await clearAuthCookie()
  //   }
  // }

  return result
}

export const apiSliceAuthenticated = createApi({
  reducerPath: 'apiAuthenticated',
  tagTypes: ['get-countries-infinite'],
  baseQuery: authenticatedBaseQuery,
  endpoints: () => ({}),
})

export const { endpoints, reducerPath, reducer, middleware } =
  apiSliceAuthenticated
