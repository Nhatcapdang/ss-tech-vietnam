'use client'

import {
  ActionBar,
  ActionBarGroup,
  ActionBarItem,
} from '@/components/ui/action-bar'
import { Pencil, RotateCcw } from 'lucide-react'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { CountriesFormSchema } from './schema'

export function CompanyProfileActionBar({
  portalContainer,
}: {
  portalContainer: React.RefObject<HTMLDivElement | null>
}) {
  const formClient = useFormContext<CountriesFormSchema>()

  const onTaskReset = React.useCallback(() => {
    formClient.reset()
  }, [formClient])

  return (
    <ActionBar
      portalContainer={portalContainer.current}
      open={formClient.formState.isDirty}
    >
      <ActionBarGroup>
        <ActionBarItem variant="outline" onClick={onTaskReset} size="md">
          <RotateCcw />
          Reset Changes
        </ActionBarItem>
        <ActionBarItem variant="default" type="submit" size="md">
          <Pencil />
          Save Changes
        </ActionBarItem>
      </ActionBarGroup>
    </ActionBar>
  )
}
