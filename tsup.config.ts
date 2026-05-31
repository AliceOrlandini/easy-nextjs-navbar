import { defineConfig } from 'tsup';
import { chmod, readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';

async function postBuild() {
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

  try {
    await chmod(join(dir, 'cli.cjs'), 0o755);
  } catch {
    // Best-effort: if chmod is unavailable or fails, the package still builds.
  }

  exec('yalc push', (error, stdout) => {
    if (error) {
      console.error(`Errore durante yalc push: ${error.message}`);
      return;
    }
    console.log(`[yalc] ${stdout.trim()}`);
  });
}

export default defineConfig([
  {
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
    onSuccess: postBuild,
  },
  {
    entry: ['src/cli.ts'],
    format: ['cjs'],
    dts: false,
    clean: false,
    splitting: false,
    treeshake: true,
    sourcemap: true,
    platform: 'node',
    target: 'node18',
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
]);
