import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a path with parameters
 * @param originalPath - The original path with parameters
 * @param params - The parameters to replace in the path
 * @returns The generated path
 * @example
 * generatePath("/users/:id", { id: "123" }); // "/users/123"
 * generatePath("/users/:id", { id: null }); // "/users/:id"
 * generatePath("/users/:id", { id: undefined }); // "/users/:id"
 */
export function generatePath<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string | null | number
  } = {} as Record<PathParam<Path>, string | null | number>
): string {
  return originalPath.replace(
    /:(\w+)/g,
    (match, key) => params[key as PathParam<Path>]?.toString() ?? match
  )
}

type PathParam<Path extends string> = Path extends `${string}:${infer Param}`
  ? Param
  : never
