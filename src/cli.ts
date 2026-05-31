import { access, readFile, readdir, writeFile } from 'fs/promises';
import { createRequire } from 'module';
import { dirname, join, relative, resolve } from 'path';
import { pathToFileURL } from 'url';
import process from 'process';

const require = createRequire(import.meta.url);
const PACKAGE_NAME = 'easy-nextjs-navbar';
const IGNORED_DIRECTORIES = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'storybook-static',
  'coverage',
]);

type TailwindMajorVersion = 3 | 4;

export function insertSourceDirective(content: string, sourcePath: string) {
  const directive = `@source "${sourcePath}";`;

  if (content.includes(directive) || content.includes(`@source '${sourcePath}';`)) {
    return content;
  }

  const lines = content.split(/\r?\n/);
  const importIndex = lines.findIndex((line) => /@import\s+["']tailwindcss["']/.test(line));

  if (importIndex >= 0) {
    lines.splice(importIndex + 1, 0, directive);
    return lines.join('\n');
  }

  if (content.length > 0 && !content.endsWith('\n')) {
    lines.push('');
  }

  lines.push(directive);
  return lines.join('\n');
}

export function insertContentEntry(content: string, entry: string) {
  if (content.includes(entry)) {
    return content;
  }

  const lines = content.split(/\r?\n/);
  const contentStart = lines.findIndex((line) => /content\s*:\s*\[/.test(line));

  if (contentStart === -1) {
    return null;
  }

  let contentEnd = -1;
  for (let index = contentStart + 1; index < lines.length; index += 1) {
    if (/^\s*\]\s*,?\s*$/.test(lines[index])) {
      contentEnd = index;
      break;
    }
  }

  if (contentEnd === -1) {
    return null;
  }

  const closingIndent = lines[contentEnd].match(/^(\s*)\]/)?.[1] ?? '';
  const entryIndent = `${closingIndent}  `;
  lines.splice(contentEnd, 0, `${entryIndent}'${entry}',`);
  return lines.join('\n');
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findFileByName(rootDir: string, fileNames: string[], preferredPaths: string[]) {
  for (const candidate of preferredPaths) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  async function walk(currentDir: string): Promise<string | null> {
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = join(currentDir, entry.name);

      if (entry.isFile() && fileNames.includes(entry.name)) {
        return entryPath;
      }

      if (entry.isDirectory() && !IGNORED_DIRECTORIES.has(entry.name)) {
        const match = await walk(entryPath);
        if (match) {
          return match;
        }
      }
    }

    return null;
  }

  return walk(rootDir);
}

async function findTailwindRoot(cwd: string) {
  try {
    const resolvedEntry = require.resolve('tailwindcss', { paths: [cwd] });
    let currentDir = dirname(resolvedEntry);

    while (true) {
      const packageJsonPath = join(currentDir, 'package.json');
      if (await fileExists(packageJsonPath)) {
        const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as { name?: string; version?: string };
        if (packageJson.name === 'tailwindcss') {
          return { rootDir: currentDir, version: packageJson.version ?? '' };
        }
      }

      const parentDir = dirname(currentDir);
      if (parentDir === currentDir) {
        return null;
      }

      currentDir = parentDir;
    }
  } catch {
    return null;
  }
}

async function detectTailwindMajorVersion(cwd: string): Promise<TailwindMajorVersion | null> {
  const tailwind = await findTailwindRoot(cwd);

  if (!tailwind?.version) {
    return null;
  }

  const major = Number(tailwind.version.split('.')[0]);
  if (major === 3 || major === 4) {
    return major;
  }

  return null;
}

function toPosixPath(pathValue: string) {
  return pathValue.replace(/\\/g, '/');
}

async function setupTailwindV4(cwd: string) {
  const globalsCss = await findFileByName(cwd, ['globals.css'], [
    join(cwd, 'src', 'app', 'globals.css'),
    join(cwd, 'app', 'globals.css'),
    join(cwd, 'src', 'styles', 'globals.css'),
    join(cwd, 'styles', 'globals.css'),
  ]);

  if (!globalsCss) {
    throw new Error('Impossibile trovare globals.css. Cerca app/globals.css o src/app/globals.css.');
  }

  const current = await readFile(globalsCss, 'utf8');
  const sourcePath = toPosixPath(relative(dirname(globalsCss), resolve(cwd, 'node_modules', PACKAGE_NAME, 'dist')));
  const updated = insertSourceDirective(current, sourcePath.startsWith('.') ? sourcePath : `./${sourcePath}`);

  if (updated === current) {
    return { filePath: globalsCss, changed: false, version: 4 as const };
  }

  await writeFile(globalsCss, updated);
  return { filePath: globalsCss, changed: true, version: 4 as const };
}

async function setupTailwindV3(cwd: string) {
  const tailwindConfig = await findFileByName(cwd, [
    'tailwind.config.ts',
    'tailwind.config.js',
    'tailwind.config.cjs',
    'tailwind.config.mjs',
  ], [
    join(cwd, 'tailwind.config.ts'),
    join(cwd, 'tailwind.config.js'),
    join(cwd, 'tailwind.config.cjs'),
    join(cwd, 'tailwind.config.mjs'),
  ]);

  if (!tailwindConfig) {
    throw new Error('Impossibile trovare tailwind.config.*. Crea prima il file di configurazione di Tailwind v3.');
  }

  const current = await readFile(tailwindConfig, 'utf8');
  const distGlob = toPosixPath(relative(dirname(tailwindConfig), resolve(cwd, 'node_modules', PACKAGE_NAME, 'dist')));
  const entry = `${distGlob.startsWith('.') ? distGlob : `./${distGlob}`}/**/*.{js,cjs}`;
  const updated = insertContentEntry(current, entry);

  if (updated === null) {
    throw new Error(
      `Ho trovato ${tailwindConfig}, ma non sono riuscito a inserire il dist della libreria nel content array. Aggancialo manualmente.`
    );
  }

  if (updated === current) {
    return { filePath: tailwindConfig, changed: false, version: 3 as const };
  }

  await writeFile(tailwindConfig, updated);
  return { filePath: tailwindConfig, changed: true, version: 3 as const };
}

function printUsage() {
  console.log([
    'Usage:',
    '  easy-nextjs-navbar init',
    '',
    'This command detects Tailwind v3 or v4 and updates the local project setup:',
    '  - Tailwind v4: adds an @source directive to globals.css',
    '  - Tailwind v3: adds the package dist folder to tailwind.config.* content',
  ].join('\n'));
}

async function main() {
  const command = process.argv[2];

  if (!command || command === '--help' || command === '-h') {
    printUsage();
    return;
  }

  if (command !== 'init') {
    console.error(`Unknown command: ${command}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  const cwd = process.cwd();
  const tailwindMajor = await detectTailwindMajorVersion(cwd);

  if (!tailwindMajor) {
    throw new Error(
      'Non riesco a rilevare Tailwind CSS. Assicurati che tailwindcss sia installato nel progetto prima di eseguire init.'
    );
  }

  const result = tailwindMajor === 4 ? await setupTailwindV4(cwd) : await setupTailwindV3(cwd);

  if (result.changed) {
    console.log(`Aggiornato ${result.filePath} per Tailwind v${result.version}.`);
  } else {
    console.log(`Nessuna modifica necessaria: ${result.filePath} era già configurato per Tailwind v${result.version}.`);
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  });
}