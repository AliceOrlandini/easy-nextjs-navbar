import { defineConfig } from 'tsup';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  // splitting: true is critical — it creates separate chunks per file,
  // which preserves RSC boundaries for Next.js.
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
  // Re-inject 'use client' directives that esbuild strips during bundling.
  // Files whose source name contains ".client" need the directive.
  async onSuccess() {
    const dir = 'dist';
    const files = await readdir(dir);
    const clientFiles = files.filter(
      (f) => f.includes('.client') && (f.endsWith('.js') || f.endsWith('.cjs')) && !f.endsWith('.map')
    );
    await Promise.all(
      clientFiles.map(async (f) => {
        const path = join(dir, f);
        const content = await readFile(path, 'utf-8');
        if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
          await writeFile(path, `'use client';\n${content}`);
        }
      })
    );
  },
});
