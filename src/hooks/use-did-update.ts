import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import { useCallbackRef } from './use-callback-ref'

export function useDidUpdate(
  fn: EffectCallback,
  dependencies?: DependencyList
) {
  const handleCallback = useCallbackRef(fn)

  const mounted = useRef(false)

  useEffect(
    () => () => {
      mounted.current = false
    },
    []
  )

  useEffect(() => {
    if (mounted.current) {
      return handleCallback()
    }

    mounted.current = true
    return undefined
  }, [handleCallback, dependencies])
}
