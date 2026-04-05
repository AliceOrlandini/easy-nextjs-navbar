import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  // splitting: true is critical — it creates separate chunks per file,
  // which preserves 'use client' directives for Next.js RSC boundaries.
  splitting: true,
  treeshake: true,
  sourcemap: true,
  external: [
    'react',
    'react-dom',
    'next',
    'next/link',
    'next/image',
    'next/dynamic',
    'next/navigation',
    'tailwindcss',
  ],
});
