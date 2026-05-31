import { describe, expect, it } from 'vitest';
import { insertContentEntry, insertSourceDirective } from './cli';

describe('insertSourceDirective', () => {
  it('inserts @source after the Tailwind import', () => {
    const input = `@import "tailwindcss";\n\nbody {\n  color: black;\n}`;
    const output = insertSourceDirective(input, '../node_modules/easy-nextjs-navbar/dist');

    expect(output).toContain('@import "tailwindcss";\n@source "../node_modules/easy-nextjs-navbar/dist";');
  });

  it('does not duplicate an existing directive', () => {
    const input = `@import "tailwindcss";\n@source "../node_modules/easy-nextjs-navbar/dist";`;

    expect(insertSourceDirective(input, '../node_modules/easy-nextjs-navbar/dist')).toBe(input);
  });
});

describe('insertContentEntry', () => {
  it('adds the dist glob to the content array', () => {
    const input = `module.exports = {\n  content: [\n    './src/**/*.{ts,tsx}',\n  ],\n};`;
    const output = insertContentEntry(input, './node_modules/easy-nextjs-navbar/dist/**/*.{js,cjs}');

    expect(output).toContain("'./node_modules/easy-nextjs-navbar/dist/**/*.{js,cjs}',");
  });

  it('returns the original content if the entry already exists', () => {
    const input = `module.exports = {\n  content: [\n    './src/**/*.{ts,tsx}',\n    './node_modules/easy-nextjs-navbar/dist/**/*.{js,cjs}',\n  ],\n};`;

    expect(insertContentEntry(input, './node_modules/easy-nextjs-navbar/dist/**/*.{js,cjs}')).toBe(input);
  });
});