import * as React from 'react'

import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogFooter as AlertDialogFooterPrimitive,
  AlertDialogHeader as AlertDialogHeaderPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogTrigger as AlertDialogTriggerPrimitive,
  AlertDialogPortal as AlertDialogPortalPrimitive,
  AlertDialogOverlay as AlertDialogOverlayPrimitive,
  AlertDialogAction as AlertDialogActionPrimitive,
  AlertDialogCancel as AlertDialogCancelPrimitive,
  type AlertDialogProps as AlertDialogPrimitiveProps,
  type AlertDialogContentProps as AlertDialogContentPrimitiveProps,
  type AlertDialogDescriptionProps as AlertDialogDescriptionPrimitiveProps,
  type AlertDialogFooterProps as AlertDialogFooterPrimitiveProps,
  type AlertDialogHeaderProps as AlertDialogHeaderPrimitiveProps,
  type AlertDialogTitleProps as AlertDialogTitlePrimitiveProps,
  type AlertDialogTriggerProps as AlertDialogTriggerPrimitiveProps,
  type AlertDialogOverlayProps as AlertDialogOverlayPrimitiveProps,
  type AlertDialogActionProps as AlertDialogActionPrimitiveProps,
  type AlertDialogCancelProps as AlertDialogCancelPrimitiveProps,
} from '@/components/animate-ui/primitives/radix/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AlertDialogProps = AlertDialogPrimitiveProps

function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive {...props} />
}

type AlertDialogTriggerProps = AlertDialogTriggerPrimitiveProps

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <AlertDialogTriggerPrimitive {...props} />
}

type AlertDialogOverlayProps = AlertDialogOverlayPrimitiveProps

function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogOverlayPrimitive
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      {...props}
    />
  )
}

type AlertDialogContentProps = AlertDialogContentPrimitiveProps

function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortalPrimitive>
      <AlertDialogOverlay />
      <AlertDialogContentPrimitive
        className={cn(
          'fixed start-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg rtl:-translate-x-[-50%]',
          className
        )}
        {...props}
      />
    </AlertDialogPortalPrimitive>
  )
}

type AlertDialogHeaderProps = AlertDialogHeaderPrimitiveProps

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <AlertDialogHeaderPrimitive
      className={cn('flex flex-col gap-2 text-center sm:text-start', className)}
      {...props}
    />
  )
}

type AlertDialogFooterProps = AlertDialogFooterPrimitiveProps

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <AlertDialogFooterPrimitive
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

type AlertDialogTitleProps = AlertDialogTitlePrimitiveProps

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogTitlePrimitive
      className={cn('text-lg font-semibold md:text-xl lg:text-2xl', className)}
      {...props}
    />
  )
}

type AlertDialogDescriptionProps = AlertDialogDescriptionPrimitiveProps

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogDescriptionPrimitive
      className={cn(
        'text-sm text-muted-foreground md:text-base lg:text-lg',
        className
      )}
      {...props}
    />
  )
}

type AlertDialogActionProps = AlertDialogActionPrimitiveProps

function AlertDialogAction({
  className,
  ...props
}: AlertDialogActionPrimitiveProps) {
  return (
    <AlertDialogActionPrimitive
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

type AlertDialogCancelProps = AlertDialogCancelPrimitiveProps

function AlertDialogCancel({
  className,
  ...props
}: AlertDialogCancelPrimitiveProps) {
  return (
    <AlertDialogCancelPrimitive
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogProps,
  type AlertDialogTriggerProps,
  type AlertDialogContentProps,
  type AlertDialogHeaderProps,
  type AlertDialogFooterProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
}
