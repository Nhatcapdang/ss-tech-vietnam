'use client'

import { useCallback, useEffect, useState } from 'react'

export const useScrollSpy = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0])

  useEffect(() => {
    // Find the section that's most visible in the viewport
    const handleScroll = () => {
      let currentSection = sections[0]
      let maxVisibility = 0

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top)
        const visibleBottom = Math.min(viewportHeight, rect.bottom)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const visibility = visibleHeight / viewportHeight

        // Bias towards sections in the upper part of viewport
        const adjustedVisibility =
          rect.top < viewportHeight / 3 ? visibility * 1.5 : visibility

        if (adjustedVisibility > maxVisibility) {
          maxVisibility = adjustedVisibility
          currentSection = sectionId
        }
      })

      setActiveSection(currentSection)
    }

    // Set initial active section
    handleScroll()

    // Add scroll listener with debounce
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 50)
    }

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [sections])

  const scrollToSection = useCallback((href: string) => {
    // Remove the '#' if present
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)

    if (element) {
      // Get navbar height for offset
      const navbarHeight = 80 // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update active section immediately for better UX
      setActiveSection(sectionId)
    }
  }, [])

  const isActive = useCallback(
    (href: string) => {
      const sectionId = href.replace('#', '')
      return activeSection === sectionId
    },
    [activeSection]
  )

  return { activeSection, scrollToSection, isActive }
}
