// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: (await import('eslint-plugin-react')).default,
    },
    ignores: ['src/components/ui/**', 'src/components/animate-ui/**'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Using TypeScript instead
      'react/display-name': 'warn',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/navigation',
              importNames: ['useRouter', 'usePathname'],
              message:
                'Use navigation hooks from "@/i18n/navigation" instead of "next/navigation" for i18n support.',
            },
            {
              name: 'next/link',
              importNames: ['default'],
              message:
                'Use Link from "@/i18n/navigation" instead of "next/link" for i18n support.',
            },
            {
              name: '@base-ui/react',
              message:
                'Do not use "@base-ui/react" directly, use "@/components/ui" instead.',
            },
            {
              name: 'radix-ui',
              message:
                'Do not use "radix-ui" directly, use "@/components/ui" instead.',
            },
          ],
          patterns: [
            {
              group: ['@radix-ui/*'],
              message:
                'Do not use "@radix-ui/*" directly, use "@/components/ui" instead.',
            },
          ],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }, // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  ...storybook.configs['flat/recommended'],
])

export default eslintConfig
