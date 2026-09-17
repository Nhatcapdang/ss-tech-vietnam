import { useTranslations } from 'next-intl'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description:
    'The page you are looking for does not exist. Please try again later.',
}

const NotFound = () => {
  const t = useTranslations('not_found_page')
  return (
    <div className="flex h-screen items-center justify-center p-4 text-center">
      <div className="text-center">
        <div className="relative">
          <h1 className="inline-block bg-linear-to-r bg-[linear-gradient(7deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.2)_100%)] from-white/5 to-white/20 bg-clip-text text-[12rem] leading-none font-bold opacity-50 select-none md:text-[16rem]">
            404
          </h1>
          <h2 className="absolute bottom-5 left-0 w-full text-5xl font-medium text-gray-300">
            {t('title')}
          </h2>
        </div>

        <p className="mx-auto mb-4 max-w-md text-sm text-gray-400 md:text-base">
          {t('title_suffix')}
        </p>

        <a
          href="./"
          className="inline-flex transform cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
        >
          {t('back_to_home')}
        </a>
      </div>
    </div>
  )
}

export default NotFound
