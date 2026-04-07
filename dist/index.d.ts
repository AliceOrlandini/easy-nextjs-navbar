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
    /**
     * How to determine if a nav link is active.
     * - 'exact': pathname must match the href exactly (default)
     * - 'startsWith': pathname only needs to start with the href (useful for nested routes)
     */
    activeMatchMode?: 'exact' | 'startsWith';
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

declare const FLAG_IT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%23CE2B37' d='M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z'/%3E%3Cpath fill='%23009246' d='M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z'/%3E%3Cpath fill='%23EEE' d='M12 5h12v26H12z'/%3E%3C/svg%3E";
declare const FLAG_EN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%2300247D' d='M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z'/%3E%3Cpath fill='%23CF1B2B' d='M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z'/%3E%3Cpath fill='%23EEE' d='M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z'/%3E%3Cpath fill='%23CF1B2B' d='M21 15V5h-6v10H0v6h15v10h6V21h15v-6z'/%3E%3C/svg%3E";
declare const DEFAULT_ICONS: NavbarIcon[];

export { DEFAULT_ICONS, FLAG_EN, FLAG_IT, Navbar, type NavbarClassNames, type NavbarCta, type NavbarIcon, type NavbarItem, type NavbarLayout, type NavbarProps, useScrollThreshold };
