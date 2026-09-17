import { createSlice } from '@reduxjs/toolkit'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface BreadcrumbsState {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  label: string
  href: string
}

const initialState: BreadcrumbsState[] = []

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbsSlice',
  initialState,
  reducers: {},
})

export const {} = breadcrumbsSlice.actions
