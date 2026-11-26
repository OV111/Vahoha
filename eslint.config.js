import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr', 'public/lesson-react.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Capitalised names are JSX components — no-unused-vars can't see JSX usage
      // without eslint-plugin-react, for variables or destructured args alike.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
      // React Compiler rules from react-hooks v7: warnings until the existing code is migrated.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
  {
    // The backend imports shared/, so it must stay plain data and logic: no React, icons or src/ code.
    files: ['shared/**/*.js'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['react', 'react-*', 'lucide-react', 'framer-motion', 'motion'], message: 'shared/ is imported by the backend: keep UI code in src/constants.' },
          { group: ['@/*', '../src/*', '**/src/*'], message: 'shared/ must not import frontend code.' },
        ],
      }],
    },
  },
])
