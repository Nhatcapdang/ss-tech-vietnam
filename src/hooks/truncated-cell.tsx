'use client'

import { useCallback, useRef, useState } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TruncatedCellProps {
  value: string
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export function TruncatedCell({ value, side = 'left' }: TruncatedCellProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const handleMouseEnter = useCallback(() => {
    const el = ref.current
    if (el) setIsTruncated(el.scrollWidth > el.offsetWidth)
  }, [])

  if (!isTruncated) {
    return (
      <span
        ref={ref}
        className="block w-full truncate text-sm"
        onMouseEnter={handleMouseEnter}
      >
        {value}
      </span>
    )
  }

  return (
    <Tooltip side={side}>
      <TooltipTrigger asChild>
        <span
          ref={ref}
          className="block w-full truncate text-sm"
          onMouseEnter={handleMouseEnter}
        >
          {value}
        </span>
      </TooltipTrigger>
      <TooltipContent>{value}</TooltipContent>
    </Tooltip>
  )
}
