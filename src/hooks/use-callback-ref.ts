import * as React from 'react'

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
 */

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 * using this hook is useful when you need to pass a callback as a prop to a component and you want to avoid triggering re-renders when the callback changes.
 * @param callback - The callback to convert to a ref.
 * @returns A callback that is updated with the latest callback value.
 * @example
 * function MyComponent({ onClick, onSelect }) {
 *   const callbackRef = useCallbackRef(onClick)
 *   return <button onClick={callbackRef} />
 * }
 * Is it any value (object, array, state) you need to read
 * inside a stable callback you own?
 * → useAsRef
 */
function useCallbackRef<T extends (...args: never[]) => unknown>(
  callback: T | undefined
): T {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T,
    []
  )
}

export { useCallbackRef }
