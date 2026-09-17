export const APIS = {
  getCountries: {
    url: '/countries/v5',
    method: 'GET',
  },
} satisfies Record<
  string,
  { url: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE' }
>
