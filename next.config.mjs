import createNextIntlPlugin from 'next-intl/plugin'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arctics-dev.s3.ap-southeast-2.amazonaws.com',
      },
    ],
  },
  experimental: {
    globalNotFound: true,
    authInterrupts: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [require.resolve('@svgr/webpack')],
    })

    return config
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [require.resolve('@svgr/webpack')],
        as: '*.js',
      },
    },
  },
}

export default withNextIntl(nextConfig)
