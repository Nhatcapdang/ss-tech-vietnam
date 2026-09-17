'use client'

import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-500" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
        close: <CircleAlertIcon className="size-4 text-red-500" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          '--close-icon': 'var(--circle-alert-icon)',
          '--close-icon-hover': 'var(--circle-alert-icon-hover)',
          '--close-icon-active': 'var(--circle-alert-icon-active)',
          '--close-icon-focus': 'var(--circle-alert-icon-focus)',
          '--close-icon-focus-visible':
            'var(--circle-alert-icon-focus-visible)',
          '--close-icon-focus-within': 'var(--circle-alert-icon-focus-within)',
        } as React.CSSProperties
      }
      toastOptions={{
        style: {},
      }}
      {...props}
    />
  )
}

export { Toaster }
