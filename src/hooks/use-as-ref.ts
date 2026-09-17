import * as React from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

/**
 * A hook that creates a ref that is updated with the latest props value.
 * This is useful for creating a ref that is updated with the latest props value,
 * but is not re-created on every render.
 * using this hook is useful when you need to pass a ref as a prop to a component and you want to avoid triggering re-renders when the ref changes.
 * @param props - The props to create a ref for.
 * @returns A ref that is updated with the latest props value.
 * @example
 * function MyComponent({ onClick, onSelect }) {
 *   const propsRef = useAsRef({ onClick, onSelect })
 *   return <button onClick={propsRef.current.onClick} onSelect={propsRef.current.onSelect} />
 * }
 * Is it any value (object, array, state) you need to read
 * inside a stable callback you own?
 * → useAsRef
 */
function useAsRef<T>(props: T) {
  const ref = React.useRef<T>(props)

  useIsomorphicLayoutEffect(() => {
    ref.current = props
  })

  return ref
}

export { useAsRef }
