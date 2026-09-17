import { APIS } from '@/configs/apis'
import { GetCountriesParams, GetCountriesResponse } from '@/types/countries'
import { apiSliceAuthenticated } from '../baseApi'

export const countriesApi = apiSliceAuthenticated.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query<
      GetCountriesResponse,
      GetCountriesParams,
      GetCountriesResponse
    >({
      query: ({ q, offset, limit }) => ({
        url: APIS.getCountries.url,
        method: 'GET',
        params: {
          q: q || undefined,
          offset,
          limit,
        },
      }),
    }),
    getCountriesInfinite: builder.infiniteQuery<
      GetCountriesResponse,
      GetCountriesParams | void,
      GetCountriesParams
    >({
      providesTags: ['get-countries-infinite'],
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 25,
          q: '',
        },
        getNextPageParam: (
          lastPage,
          _allPages,
          lastPageParam,
          _allPageParams
        ) => {
          const nextPage = lastPageParam.offset + 1
          const totalItems = lastPage?.data.meta.total ?? 0
          const pageSize = lastPageParam.limit

          if (pageSize <= 0) return undefined

          const nextOffset = nextPage * pageSize
          if (nextOffset >= totalItems) {
            return undefined
          }

          return {
            ...lastPageParam,
            offset: nextPage,
          }
        },
        getPreviousPageParam: (
          _firstPage,
          _allPages,
          firstPageParam,
          _allPageParams
        ) => {
          const prevPage = firstPageParam.offset - 1
          if (prevPage < 0) return undefined

          return {
            ...firstPageParam,
            offset: prevPage,
          }
        },
      },
      query: ({ pageParam, queryArg }) => {
        return {
          url: APIS.getCountries.url,
          method: APIS.getCountries.method,
          params: {
            ...pageParam,
            q: queryArg?.q || undefined,
            offset: pageParam?.offset || undefined,
            limit: pageParam?.limit || undefined,
          },
        }
      },
    }),
  }),
})

export const { useGetCountriesQuery, useGetCountriesInfiniteInfiniteQuery } =
  countriesApi
