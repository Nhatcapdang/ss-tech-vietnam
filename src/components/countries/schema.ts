import { z } from 'zod'

export const countriesFormSchema = z.object({
  query: z.union([z.literal(''), z.string().trim()]),
}) satisfies z.ZodType<{
  query: string
}>

export type CountriesFormSchema = z.infer<typeof countriesFormSchema>
