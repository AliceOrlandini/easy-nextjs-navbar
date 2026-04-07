import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type NavbarItem = {
  title: string;
  /** href WITHOUT locale prefix, e.g. '/about' or '/' */
  href: string;
  ariaLabel: string;
};

export type NavbarIcon = {
  /** Actual image source — a static import (StaticImageData) or a URL string */
  src: string | StaticImageData;
  /** Locale code this icon switches to, e.g. 'it', 'en' */
  locale: string;
  alt: string;
};

export type NavbarCta = {
  title: string;
  /** href WITHOUT locale prefix */
  href: string;
  /** Optional icon rendered after the title (e.g. <Send size={16} />) */
  icon?: ReactNode;
};

export type NavbarLayout = 'logo-left' | 'logo-center' | 'logo-right';

export type NavbarClassNames = {
  /** Outermost wrapper div */
  container?: string;
  /** The <nav> element */
  nav?: string;
  /** Logo <Image> */
  logo?: string;
  /** <Link> wrapping logo image + brandName */
  logoWrapper?: string;
  /** Brand name <span> rendered next to the logo */
  brandName?: string;
  /** Brand name <span> modifier applied when the sticky navbar is shown */
  brandNameSticky?: string;
  /** Brand name <span> modifier applied when the mobile menu is open */
  brandNameOpen?: string;
  /** Each nav item <a> link */
  link?: string;
  /** Each nav item <a> link modifier applied when the sticky navbar is shown */
  linkSticky?: string;
  /** Modifier applied to the active nav item <li> */
  linkActive?: string;
  /** CTA <a> link */
  cta?: string;
  /** Language switcher container div */
  languageSwitcher?: string;
  /** Each flag <Image> */
  flagIcon?: string;
  /** Mobile hamburger button wrapper */
  hamburger?: string;
  /** Mobile hamburger button wrapper modifier applied when the mobile menu is open */
  hamburgerOpen?: string;
  /** Mobile hamburger button wrapper modifier applied when the sticky navbar is shown */
  hamburgerSticky?: string;
  /** Mobile dropdown menu panel */
  mobileMenu?: string;
  /** Each mobile menu <li> item */
  mobileMenuItem?: string;
  /** Modifier applied to the active mobile menu <li> */
  mobileMenuItemActive?: string;
  /** Dark semi-transparent overlay behind mobile menu */
  mobileOverlay?: string;
  /** Fixed sticky bar wrapper */
  stickyBar?: string;
};

export type NavbarProps = {
  /** Current locale string, e.g. 'it' or 'en'. Omit for non-localized apps */
  locale?: string;
  /** Navigation items (hrefs without locale prefix) */
  items: NavbarItem[];
  /** Logo image — a Next.js static import or URL string */
  logoSrc: string | StaticImageData;
  /** Alt text for the logo */
  logoAlt: string;
  /** Optional text rendered next to the logo */
  brandName?: string;
  /** Language switcher icons. Omit or pass [] to hide the switcher entirely */
  icons?: NavbarIcon[];
  /** Call-to-action config. Omit to hide the CTA button */
  cta?: NavbarCta;
  /** Show or hide the language switcher. Defaults to true when icons are provided */
  showLanguageSwitcher?: boolean;
  /** Controls the position of the logo in the navbar. Default: 'logo-center' */
  layout?: NavbarLayout;
  /** Tailwind class overrides for every internal sub-component */
  classNames?: NavbarClassNames;
  /** Optional decorative bottom image for the mobile dropdown menu */
  decorativeBorderSrc?: string | StaticImageData;
  /** Accessible label for the mobile hamburger toggle. Default: 'Open/close menu' */
  hamburgerLabel?: string;
  /** Scroll threshold to trigger the desktop sticky reveal. Default: '100vh' */
  stickyThreshold?: string | number;
  /** Scroll threshold (px) to trigger the mobile sticky bar. Default: 500 */
  mobileStickyThreshold?: string | number;
  /**
   * How to determine if a nav link is active.
   * - 'exact': pathname must match the href exactly (default)
   * - 'startsWith': pathname only needs to start with the href (useful for nested routes)
   */
  activeMatchMode?: 'exact' | 'startsWith';
};

// ─── Internal prop shapes (passed from Navbar orchestrator to sub-components) ──

export type InternalNavbarProps = Omit<NavbarProps, 'locale' | 'items' | 'cta'> & {
  /** Items already prefixed with locale, ready to render */
  items: NavbarItem[];
  cta?: NavbarCta & { href: string }; // href already localized
  homeHref: string;
  locales: string[];
};
