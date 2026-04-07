# easy-nextjs-navbar

> [!WARNING]  
> This library is in early beta. I'm actively developing it so expect breaking changes until the 1.0.0 release. Feedback and contributions are very welcome!

A sticky, localized navbar built specifically for **Next.js App Router** best practices: the desktop navbar is a Server Component by default, and client-side JavaScript is added only where strictly necessary (scroll detection, active route, language switching, mobile drawer).

## Features

- Desktop navbar is a **Server Component** — zero JS overhead for static content
- Client Components used only where required: scroll threshold, active link, language switcher, mobile drawer
- Automatic locale prefixing — pass `/about`, render `/en/about`
- Sticky reveal on desktop — slides in after scrolling past a configurable threshold
- Mobile drawer with animated hamburger, overlay, and keyboard accessibility
- Built-in language switcher with flag icons and cookie persistence
- Three logo layouts: `logo-left`, `logo-center`, `logo-right` (This is a beta feature! Logo left is tested, but the others are new and may have some rough edges. I'm working on improving it. Feedback welcome.)
- Full Tailwind class override for every internal element via `classNames`

## Installation

```bash
pnpm add easy-nextjs-navbar
```

**Peer dependencies** (install separately if not already in your project):

```bash
pnpm add next react react-dom tailwindcss
```

## Tailwind setup

The library ships pre-compiled classes inside `dist/`. You must tell Tailwind where to find them, otherwise the classes will be purged from your build.

### Tailwind v4

Add a `@source` directive in your `globals.css`:

```css
@source "../node_modules/easy-nextjs-navbar/dist";
```

> Adjust the relative path if your `globals.css` is nested deeper (e.g. `src/app/globals.css` → `../../node_modules/easy-nextjs-navbar/dist`).

### Tailwind v3

Add the library's dist folder to the `content` array in `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/easy-nextjs-navbar/dist/**/*.{js,cjs}',
  ],
  // ...
};
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

> `Navbar` is a Server Component. Drop it directly in a Next.js layout or page — no `'use client'` needed.

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
      activeMatchMode="startsWith"
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
| `activeMatchMode` | `'exact' \| 'startsWith'` | `'exact'` | How to detect the active link, this could be useful for custom css for the active link. Use `'startsWith'` for nested routes, otherwise `'exact'` |
| `classNames` | `NavbarClassNames` | `{}` | Tailwind class overrides for internal elements — see [Customization](#customization) |
| `decorativeBorderSrc` | `string \| StaticImageData` | — | Decorative image at the bottom of the mobile drawer |
| `hamburgerLabel` | `string` | `'Open/close menu'` | Accessible label for the mobile hamburger button |
| `stickyThreshold` | `string \| number` | `'100vh'` | Scroll threshold to show the desktop sticky bar. Accepts px numbers or `vh` strings |
| `mobileStickyThreshold` | `string \| number` | `500` | Scroll threshold to show the mobile sticky bar (px) |

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

Every internal element can be styled by passing Tailwind classes to the `classNames` prop. Classes are merged with the defaults using `tailwind-merge`, so your overrides always win.

### `classNames` reference

| Key | Element | When applied |
|---|---|---|
| `container` | Outermost wrapper `<div>` | Always |
| `nav` | The `<nav>` element | Always |
| `logoWrapper` | `<Link>` wrapping the logo and brand name | Always |
| `logo` | Logo `<Image>` | Always |
| `brandName` | Brand name `<span>` next to the logo | Always |
| `brandNameSticky` | Brand name `<span>` modifier | Only when the sticky bar is visible |
| `brandNameOpen` | Brand name `<span>` modifier | Only when the mobile menu is open |
| `link` | Each desktop nav item `<a>` | Always |
| `linkSticky` | Desktop nav item `<a>` modifier | Only when the sticky bar is visible |
| `linkActive` | Desktop nav item `<a>` modifier | Only on the currently active route |
| `cta` | CTA `<a>` link | Always |
| `languageSwitcher` | Language switcher container `<div>` | Always |
| `flagIcon` | Each flag `<Image>` | Always |
| `hamburger` | Mobile hamburger button wrapper | Always |
| `hamburgerSticky` | Hamburger wrapper modifier | Only when the mobile sticky bar is visible |
| `hamburgerOpen` | Hamburger wrapper modifier | Only when the mobile menu is open |
| `mobileMenu` | Mobile dropdown panel | Always |
| `mobileMenuItem` | Each mobile menu `<li>` | Always |
| `mobileMenuItemActive` | Mobile menu `<li>` modifier | Only on the currently active route |
| `mobileOverlay` | Semi-transparent backdrop behind the mobile menu | Always |
| `stickyBar` | Fixed sticky bar wrapper | Always |

### Example: dark sticky bar

```tsx
classNames={{
  stickyBar: 'bg-neutral-900/95 backdrop-blur',
  link: 'text-neutral-300',
  linkSticky: 'text-white',
  linkActive: 'text-white border-b border-white',
  cta: 'bg-white text-neutral-900 hover:bg-neutral-100',
}}
```

## Built-in flag icons

The library ships Italian and UK flag icons ready to use as the `icons` prop.

```tsx
import { Navbar, DEFAULT_ICONS } from 'easy-nextjs-navbar';

<Navbar
  icons={DEFAULT_ICONS}
  // ...
/>
```

`DEFAULT_ICONS` is an array of two `NavbarIcon` entries (`locale: 'it'` and `locale: 'en'`). You can also import the individual flags and build your own array:

```tsx
import { FLAG_IT, FLAG_EN } from 'easy-nextjs-navbar';

const icons: NavbarIcon[] = [
  { src: FLAG_IT, locale: 'it', alt: 'Italiano' },
  { src: FLAG_EN, locale: 'en', alt: 'English' },
];
```

Replace any entry with your own `StaticImageData` import or image URL to use custom flags.

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
