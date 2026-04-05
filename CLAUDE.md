# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`easy-nextjs-navbar` is a publishable npm library — a reusable, localized sticky navbar for Next.js. It is **not** an app; there is no dev server or test suite. The `dist/` folder is committed to the repo and rebuilt automatically by CI on every push to `main`.

## Commands

```bash
pnpm build        # compile src/ → dist/ (ESM + CJS + .d.ts)
pnpm dev          # watch mode — rebuilds on file changes
```

There is no lint, format, or test command configured.

## Build system

- **tsup** bundles `src/index.ts` into `dist/` with `splitting: true` — this is critical. Code-splitting preserves `'use client'` directives at chunk boundaries, which is required for Next.js RSC compatibility.
- Peer dependencies (`react`, `react-dom`, `next`, `tailwindcss`) are externalized and never bundled.
- No Tailwind configuration is required by consumers — only standard built-in Tailwind classes are used (`lg:`, `sm:`, `neutral-*`, etc.).

## Architecture

### Component tree

`Navbar` (Server Component, `src/components/navbar.tsx`) is the public API entry point. It:
1. Localizes all `href` values by prepending `/${locale}` 
2. Derives the `locales` array from `icons[].locale` (consumers don't pass it separately)
3. Renders both `DesktopNavbar` and `MobileNavbar` via `next/dynamic`

`DesktopNavbar` (`src/components/desktop-navbar.tsx`) is also a Server Component. It renders the navbar twice — once statically at the top, and once inside `StickyReveal` (a `'use client'` wrapper that slides in after scrolling past a threshold).

Client Components (files ending in `.client.tsx`):
- `sticky-reveal.client.tsx` — listens to scroll and controls visibility via `useScrollThreshold`
- `desktop-nav-items.client.tsx` — tracks active route with `usePathname`
- `language-switcher.client.tsx` — reads `usePathname`/`useSearchParams`, sets a `locale` cookie on switch
- `mobile-navbar.client.tsx` — hamburger menu with open/close state

### Localization pattern

All hrefs passed to `<Navbar>` must be **without** the locale prefix (e.g. `'/about'`, not `'/it/about'`). The `Navbar` orchestrator prepends `/${locale}` before passing to sub-components. The `LanguageSwitcher` swaps the locale segment in the current path using the `withLocale()` helper.

### CI / Publishing

`dist/` is in `.gitignore` and is never committed to git.

- **`ci.yml`** — runs `pnpm build` on every push/PR to `main` to verify the build is healthy.
- **`publish.yml`** — triggered by version tags (`v*`). Builds and publishes to npm using `pnpm publish --no-git-checks`. Requires an `NPM_TOKEN` secret configured in the GitHub repo settings.

**To release a new version:**
```bash
npm version patch   # or minor / major — bumps package.json and creates a git tag
git push origin main --tags
```
The `publish.yml` workflow picks up the tag and publishes automatically. The `prepublishOnly` script in `package.json` also ensures the build runs if you ever publish manually with `pnpm publish`.
