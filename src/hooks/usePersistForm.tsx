import { useEffect } from 'react'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'
import { useDebouncedCallback } from './use-debounced-callback'

type StorageType = 'localStorage' | 'sessionStorage'

interface UsePersistFormOptions {
  storageType?: StorageType
  debounceMs?: number
  enabled?: boolean
}

function getStorage(type: StorageType): Storage | null {
  if (typeof window === 'undefined') return null
  return type === 'sessionStorage' ? window.sessionStorage : window.localStorage
}

/**
 *
 * @param form - The form to persist
 * @param storageKey - The key to store the form data
 * @param enabled - When false, skip restore and persistence (e.g. edit vs create). Default true.
 * @returns The clear storage function
 * @example
 * const { clearStorage } = usePersistForm(form, 'client-details-draft', {
 *   storageType: 'sessionStorage',
 *   debounceMs: 1000,
 *   enabled: isCreateRoute,
 * })
 * clearStorage()
 */
export function usePersistForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  storageKey: string,
  options: UsePersistFormOptions = {}
) {
  const {
    storageType = 'localStorage',
    debounceMs = 500,
    enabled = true,
  } = options
  const { watch, reset } = form

  // Restore on mount
  useEffect(() => {
    if (!enabled) return
    const storage = getStorage(storageType)
    if (!storage) return

    const stored = storage.getItem(storageKey)
    if (stored) {
      try {
        reset(JSON.parse(stored))
      } catch {
        storage.removeItem(storageKey) // Clear corrupted data
      }
    }
  }, [reset, storageKey, storageType, enabled])

  // Persist on change (debounced)
  const saveToStorage = useDebouncedCallback((values: T) => {
    const storage = getStorage(storageType)
    storage?.setItem(storageKey, JSON.stringify(values))
  }, debounceMs)

  useEffect(() => {
    if (!enabled) return
    const subscription = watch(values => saveToStorage(values as T))
    return () => subscription.unsubscribe()
  }, [watch, saveToStorage, enabled])

  // Return a helper to manually clear the stored data
  const clearStorage = () => {
    const storage = getStorage(storageType)
    storage?.removeItem(storageKey)
  }

  return { clearStorage }
}
