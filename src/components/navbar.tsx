import dynamic from 'next/dynamic';
import type { NavbarProps, InternalNavbarProps } from '../types';

const DesktopNavbar = dynamic(() => import('./desktop-navbar'));
const MobileNavbar = dynamic(() => import('./mobile-navbar.client'));

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
export function Navbar({
  locale,
  items,
  cta,
  icons,
  ...rest
}: NavbarProps) {
  // Prefix all hrefs with the current locale
  const localizedItems = items.map((i) => ({
    ...i,
    href: i.href === '/' ? `/${locale}` : `/${locale}${i.href}`,
  }));

  const localizedCta = cta
    ? {
        ...cta,
        href: cta.href === '/' ? `/${locale}` : `/${locale}${cta.href}`,
      }
    : undefined;

  const homeHref = `/${locale}`;

  // Derive the locales list from the icons array so consumers don't need to
  // pass a separate prop — the LanguageSwitcher uses it for path manipulation.
  const locales = (icons ?? []).map((i) => i.locale);

  const internalProps: InternalNavbarProps = {
    ...rest,
    items: localizedItems,
    cta: localizedCta,
    homeHref,
    locales,
    icons,
  };

  return (
    <>
      <DesktopNavbar {...internalProps} />
      <MobileNavbar {...internalProps} />
    </>
  );
}
