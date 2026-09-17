import { useCallback, useState } from 'react'

export interface UseDisclosureOptions {
  onOpen?: () => void
  onClose?: () => void
}

export interface UseDisclosureHandlers {
  set: (value: boolean) => void
  open: () => void
  close: () => void
  toggle: () => void
}

export type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers]

export function useDisclosure(
  initialState = false,
  options: UseDisclosureOptions = {}
): UseDisclosureReturnValue {
  const [opened, setOpened] = useState(initialState)

  const open = useCallback(() => {
    setOpened(isOpened => {
      if (!isOpened) {
        options.onOpen?.()
        return true
      }
      return isOpened
    })
  }, [options])

  const close = useCallback(() => {
    setOpened(isOpened => {
      if (isOpened) {
        options.onClose?.()
        return false
      }
      return isOpened
    })
  }, [options])

  const toggle = useCallback(() => {
    if (opened) {
      close()
    } else {
      open()
    }
  }, [close, open, opened])

  return [opened, { open, close, toggle, set: setOpened }]
}

export type Options = UseDisclosureOptions
export type Handlers = UseDisclosureHandlers
export type ReturnValue = UseDisclosureReturnValue
