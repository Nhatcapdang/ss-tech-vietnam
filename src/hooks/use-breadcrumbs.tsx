'use client'

import { usePathname } from '@/i18n/navigation'
import {
  BoxIcon,
  HomeIcon,
  TestTubeIcon,
  UserIcon,
  type LucideIcon,
} from 'lucide-react'
import { AppConfig } from 'next-intl'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

type BreadcrumbItem = {
  icon?: LucideIcon
  label: string
  href: string
}

/**
 *
 * @param pathname
 * @param slug
 * @example
 * buildPatternPath('/dashboard/clients/3662', ['3662']) => '/dashboard/clients/:code1'
 * buildPatternPath('/dashboard/clients/3662/edit', ['3662']) => '/dashboard/clients/:code1/edit'
 * buildPatternPath('/dashboard/clients/3662/shipment/1232', ['3662', '1232']) => '/dashboard/clients/:code1/shipment/:code2'
 */
function buildPatternPath(pathname: string, slug: string[] = []) {
  let result = pathname

  slug.forEach((value, index) => {
    const regex = new RegExp(`/${value}(?=/|$)`)
    result = result.replace(regex, `/:code${index + 1}`)
  })

  return result
}

const clientByIdData = {
  code: '1234567890',
  id: 1,
}

export function useBreadcrumbs() {
  const pathname = usePathname()
  const params = useParams<{
    locale: AppConfig['Locale']
    [key: string]: string | string[]
  }>()
  const { slug: id } = useParams<{ slug: string }>()
  console.log(clientByIdData, id)
  const routeMapping: Record<string, BreadcrumbItem[]> = useMemo(() => {
    if (!clientByIdData) return {} as Record<string, BreadcrumbItem[]>
    return {
      '/dashboard': [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
      ],
      '/dashboard/create-token': [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        {
          icon: UserIcon,
          label: 'Create  Token',
          href: '/dashboard/create-token',
        },
      ],
      '/dashboard/update-metadata': [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        {
          icon: BoxIcon,
          label: 'Update Metadata',
          href: '/dashboard/update-metadata',
        },
      ],
      '/dashboard/test': [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        { icon: TestTubeIcon, label: 'Test', href: '/dashboard/test' },
      ],
      '/dashboard/clients': [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        { icon: UserIcon, label: 'Clients', href: '/dashboard/clients' },
      ],
      '/dashboard/clients/:code2': [
        { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
        { icon: UserIcon, label: 'Clients', href: '/dashboard/clients' },
        {
          label: clientByIdData?.code,
          href: `/dashboard/clients/${clientByIdData?.id}`,
        },
      ],
    }
  }, [])

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const patternPath = buildPatternPath(pathname, Object.values(params).flat())
    // Check if we have a custom mapping for this exact path
    if (routeMapping[patternPath]) {
      return routeMapping[patternPath]
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean)
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: path,
      }
    })
  }, [params, pathname, routeMapping])

  return breadcrumbs
}
