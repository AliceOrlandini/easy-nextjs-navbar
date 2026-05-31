import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const cliBinaryPath = resolve(process.cwd(), 'dist', 'cli-entry.cjs');
const smokeTest = existsSync(cliBinaryPath) ? it : it.skip;

describe('cli entrypoint smoke test', () => {
  smokeTest('prints help output from the built binary', () => {
    const output = execFileSync('node', [cliBinaryPath, '--help'], { encoding: 'utf8' });

    expect(output).toContain('easy-nextjs-navbar init');
    expect(output).toContain('Usage:');
  });
});