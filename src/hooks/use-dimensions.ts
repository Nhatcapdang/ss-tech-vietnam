import { useLayoutEffect, useState } from 'react'

interface Dimensions {
  width: number
  height: number
}

const initialDimensions: Dimensions = { width: 0, height: 0 }

export function useDimensions(ref: React.RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState(initialDimensions)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    function updateDimensions() {
      const current = ref.current
      if (!current) {
        return
      }

      setDimensions({
        width: current.offsetWidth,
        height: current.offsetHeight,
      })
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])

  return dimensions
}
