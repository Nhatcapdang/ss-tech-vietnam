'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { useIsMobile } from '@/hooks/use-mobile'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { Separator } from './separator'

export default function BreadcrumbWithIcons() {
  const isMobile = useIsMobile()
  const breadcrumbs = useBreadcrumbs()
  if (breadcrumbs.length === 0) return null

  return (
    <div className="flex w-full">
      <Breadcrumb>
        <BreadcrumbList className="gap-0">
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-5"
          />
          {breadcrumbs.map((item, idx) => (
            <Fragment key={idx}>
              <BreadcrumbItem key={item.href}>
                <BreadcrumbLink
                  className={cn(
                    'flex items-center text-foreground duration-200 ease-linear hover:underline',
                    {
                      'pointer-events-none opacity-50':
                        idx === breadcrumbs.length - 1,
                    }
                  )}
                  asChild
                >
                  <Link href={item.href} className="flex items-center gap-1.5">
                    {item.icon && (
                      <item.icon aria-hidden="true" className="size-4" />
                    )}
                    {isMobile ? (
                      <span className="sr-only">{item.label}</span>
                    ) : (
                      item.label
                    )}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {idx !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
