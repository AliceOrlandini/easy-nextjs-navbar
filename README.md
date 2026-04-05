# easy-nextjs-navbar

A reusable, localized sticky navbar for Next.js with built-in mobile support, language switching, and Tailwind CSS customization.

## Features

- Server Component by default — only the interactive parts are Client Components
- Automatic locale prefixing for all hrefs (pass `/about`, get `/it/about`)
- Sticky reveal on desktop — slides in after scrolling past a configurable threshold
- Mobile drawer with animated hamburger, overlay, and keyboard accessibility
- Built-in language switcher with flag icons and cookie persistence
- Three logo layouts: `logo-left`, `logo-center`, `logo-right`
- Full Tailwind class override for every internal element via `classNames`
- Colors overridable via CSS custom properties without touching the preset

## Installation

```bash
pnpm add easy-nextjs-navbar
```

**Peer dependencies** (install separately if not already in your project):

```bash
pnpm add next react react-dom tailwindcss
```

## Quick start

```tsx
import { Navbar } from 'easy-nextjs-navbar';
import logo from '@/public/logo.webp';

export default function Header({ locale }: { locale: string }) {
  return (
    <Navbar
      locale={locale}
      logoSrc={logo}
      logoAlt="My Brand"
      items={[
        { title: 'Home',    href: '/',        ariaLabel: 'Go to home' },
        { title: 'About',   href: '/about',   ariaLabel: 'Go to about page' },
        { title: 'Contact', href: '/contact', ariaLabel: 'Go to contact page' },
      ]}
    />
  );
}
```

> `Navbar` is a Server Component. Use it directly in a Next.js layout or page — no `'use client'` needed.

## Full example

```tsx
import { Navbar } from 'easy-nextjs-navbar';
import { Send } from 'lucide-react';
import logo from '@/public/logo.webp';
import italyFlag from '@/public/flags/it.svg';
import ukFlag from '@/public/flags/en.svg';
import decorativeBorder from '@/public/navbar-border.png';

export default function Header({ locale }: { locale: string }) {
  return (
    <Navbar
      locale={locale}
      logoSrc={logo}
      logoAlt="My Brand"
      brandName="My Brand"
      items={[
        { title: 'Home',    href: '/',        ariaLabel: 'Go to home' },
        { title: 'About',   href: '/about',   ariaLabel: 'Go to about page' },
        { title: 'Contact', href: '/contact', ariaLabel: 'Go to contact page' },
      ]}
      icons={[
        { src: italyFlag, locale: 'it', alt: 'Italiano' },
        { src: ukFlag,    locale: 'en', alt: 'English' },
      ]}
      cta={{ title: 'Write to us', href: '/contact', icon: <Send size={16} /> }}
      layout="logo-center"
      stickyThreshold="100vh"
      mobileStickyThreshold={500}
      decorativeBorderSrc={decorativeBorder}
      hamburgerLabel="Open/close menu"
      classNames={{
        cta: 'bg-blue-600 hover:bg-blue-700 text-white',
        link: 'text-white/80 hover:text-white',
        linkActive: 'border-white',
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | — | Current locale, e.g. `'it'` or `'en'`. Omit for non-localized apps |
| `items` | `NavbarItem[]` | **required** | Navigation items — hrefs without locale prefix |
| `logoSrc` | `string \| StaticImageData` | **required** | Logo image source |
| `logoAlt` | `string` | **required** | Alt text for the logo |
| `brandName` | `string` | — | Text rendered next to the logo |
| `icons` | `NavbarIcon[]` | `[]` | Language switcher flag icons. Omit to hide the switcher |
| `cta` | `NavbarCta` | — | Call-to-action button config. Omit to hide it |
| `showLanguageSwitcher` | `boolean` | `true` | Show/hide the language switcher when icons are provided |
| `layout` | `NavbarLayout` | `'logo-center'` | Logo position — see [Layouts](#layouts) |
| `classNames` | `NavbarClassNames` | `{}` | Tailwind class overrides for internal elements |
| `decorativeBorderSrc` | `string \| StaticImageData` | — | Decorative image at the bottom of the mobile drawer |
| `hamburgerLabel` | `string` | `'Open/close menu'` | Accessible label for the mobile hamburger button |
| `stickyThreshold` | `string \| number` | `'100vh'` | Scroll threshold to show the desktop sticky bar. Accepts px or `vh` strings |
| `mobileStickyThreshold` | `string \| number` | `500` | Scroll threshold (px) to show the mobile sticky bar |

### NavbarItem

```ts
type NavbarItem = {
  title: string;
  href: string;      // without locale prefix, e.g. '/about'
  ariaLabel: string;
};
```

### NavbarIcon

```ts
type NavbarIcon = {
  src: string | StaticImageData;
  locale: string;   // e.g. 'it', 'en'
  alt: string;
};
```

### NavbarCta

```ts
type NavbarCta = {
  title: string;
  href: string;         // without locale prefix
  icon?: ReactNode;     // rendered after the title
};
```

## Layouts

The `layout` prop controls where the logo appears in the desktop navbar:

| Value | Description |
|---|---|
| `'logo-center'` (default) | Logo in the center, language switcher + CTA on the left, nav links on the right |
| `'logo-left'` | Logo on the left, nav links in the center, language switcher + CTA on the right |
| `'logo-right'` | Logo on the right, nav links in the center, language switcher + CTA on the left |

## Customization

### Class overrides

Every internal element can be styled by passing Tailwind classes to the `classNames` prop. Classes are merged with the defaults using `tailwind-merge`, so your classes always win.

| Key | Target element |
|---|---|
| `container` | Outermost wrapper `<div>` |
| `nav` | The `<nav>` element |
| `logoWrapper` | `<Link>` wrapping the logo and brand name |
| `logo` | Logo `<Image>` |
| `brandName` | Brand name `<span>` |
| `link` | Each desktop nav item `<a>` |
| `linkActive` | Modifier on the active nav item |
| `cta` | CTA `<a>` link |
| `languageSwitcher` | Language switcher container |
| `flagIcon` | Each flag `<Image>` |
| `hamburger` | Mobile hamburger button wrapper |
| `mobileMenu` | Mobile dropdown panel |
| `mobileMenuItem` | Each mobile menu `<li>` |
| `mobileOverlay` | Semi-transparent backdrop |
| `stickyBar` | Fixed sticky bar wrapper |

## `useScrollThreshold`

A utility hook exported separately for use in your own components.

```ts
import { useScrollThreshold } from 'easy-nextjs-navbar';

const isPastHero = useScrollThreshold('100vh');
const isPast500px = useScrollThreshold(500);
```

Returns `true` when the page has scrolled past the given threshold. Accepts a number (pixels) or a string with a `vh` unit. Uses `requestAnimationFrame` throttling and a passive scroll listener.

## License

MIT — [Alice Orlandini](https://github.com/AliceOrlandini)
