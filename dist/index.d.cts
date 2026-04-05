import * as react_jsx_runtime from 'react/jsx-runtime';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

type NavbarItem = {
    title: string;
    /** href WITHOUT locale prefix, e.g. '/about' or '/' */
    href: string;
    ariaLabel: string;
};
type NavbarIcon = {
    /** Actual image source — a static import (StaticImageData) or a URL string */
    src: string | StaticImageData;
    /** Locale code this icon switches to, e.g. 'it', 'en' */
    locale: string;
    alt: string;
};
type NavbarCta = {
    title: string;
    /** href WITHOUT locale prefix */
    href: string;
    /** Optional icon rendered after the title (e.g. <Send size={16} />) */
    icon?: ReactNode;
};
type NavbarLayout = 'logo-left' | 'logo-center' | 'logo-right';
type NavbarClassNames = {
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
    /** Brand name <span> modifier applied when the mobile menu is open */
    brandNameOpen?: string;
    /** Each nav item <a> link */
    link?: string;
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
type NavbarProps = {
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
};

/**
 * Main Navbar component.
 *
 * Server Component — renders both the desktop and mobile navbars.
 * Pass `locale` and un-prefixed `items`/`cta` hrefs; this component
 * prepends the locale to every href automatically.
 *
 * @example
 * ```tsx
 * import { Navbar } from 'easy-nextjs-navbar';
 * import logo from '@/public/logo.webp';
 * import italyFlag from '@/public/flags/it.svg';
 * import ukFlag from '@/public/flags/en.svg';
 *
 * <Navbar
 *   locale="it"
 *   logoSrc={logo}
 *   logoAlt="My Brand"
 *   brandName="My Brand"
 *   items={[
 *     { title: 'Home',    href: '/',        ariaLabel: 'Go to home' },
 *     { title: 'About',   href: '/about',   ariaLabel: 'Go to about page' },
 *     { title: 'Contact', href: '/contact', ariaLabel: 'Go to contact page' },
 *   ]}
 *   icons={[
 *     { src: italyFlag, locale: 'it', alt: 'Italiano' },
 *     { src: ukFlag,    locale: 'en', alt: 'English' },
 *   ]}
 *   cta={{ title: 'Write to us', href: '/contact', icon: <Send size={16} /> }}
 *   layout="logo-center"
 *   classNames={{ cta: 'bg-blue-600 hover:bg-blue-700 text-white' }}
 * />
 * ```
 */
declare function Navbar({ locale, items, cta, icons, ...rest }: NavbarProps): react_jsx_runtime.JSX.Element;

declare function useScrollThreshold(thresholdInput?: number | string): boolean;

export { Navbar, type NavbarClassNames, type NavbarCta, type NavbarIcon, type NavbarItem, type NavbarLayout, type NavbarProps, useScrollThreshold };
