import { defineConfig } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Frontend unit tests: pure helpers + hooks, in tests/unit, mirroring the src/ tree.
// jsdom gives hooks a DOM; the "@" and "@shared" aliases match vite.config.js.
export default defineConfig({
  root,
  resolve: { alias: { '@': path.resolve(root, 'src'), '@shared': path.resolve(root, 'shared') } },
  // Components use the automatic JSX runtime (no `import React`), same as Vite.
  esbuild: { jsx: 'automatic' },
  test: {
    include: ['tests/unit/**/*.test.{js,jsx}'],
    environment: 'jsdom',
  },
})
