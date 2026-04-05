'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Squash as Hamburger } from 'hamburger-react';
import { Suspense } from 'react';
import { useEffect, useState, useRef, SetStateAction, Dispatch } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { cn } from '../lib/cn';
import { useScrollThreshold } from '../hooks/use-scroll-threshold';
import type { InternalNavbarProps } from '../types';

const LanguageSwitcher = dynamic(() => import('./language-switcher.client'));

export default function MobileNavbar({
  items,
  icons = [],
  locales,
  cta,
  homeHref,
  logoSrc,
  logoAlt,
  brandName,
  showLanguageSwitcher = true,
  decorativeBorderSrc,
  hamburgerLabel = 'Open/close menu',
  mobileStickyThreshold = 500,
  classNames = {},
}: InternalNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isStickyVisible = useScrollThreshold(mobileStickyThreshold);
  const pathname = usePathname() ?? '/';
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Prevent scrolling when menu is open
  useEffect(() => {
    const { body } = document;
    if (isMenuOpen) {
      const prev = body.style.overflow;
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  // Close on Escape; focus first link when menu opens (accessibility)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', onKeyDown);
      const id = setTimeout(() => firstLinkRef.current?.focus(), 10);
      return () => {
        clearTimeout(id);
        document.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [isMenuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <div className={cn('lg:hidden', classNames.container)}>
      {/* Mobile Navbar On Top */}
      <div className='relative isolate z-30 w-full px-5 py-3'>
        <BaseNavbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          homeHref={homeHref}
          logoSrc={logoSrc}
          logoAlt={logoAlt}
          brandName={brandName}
          icons={icons}
          locales={locales}
          showLanguageSwitcher={showLanguageSwitcher}
          hamburgerLabel={hamburgerLabel}
          classNames={classNames}
        />
      </div>

      {/* Mobile Sticky Bar */}
      <div
        className={cn(
          'fixed top-0 right-0 left-0 z-50 max-w-screen transition-transform duration-300 ease-in-out',
          isStickyVisible ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div
          className={cn(
            'bg-neutral-900 h-fit max-w-screen p-5',
            isStickyVisible && !isMenuOpen ? 'shadow-md' : '',
            classNames.stickyBar
          )}
        >
          <BaseNavbar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            homeHref={homeHref}
            logoSrc={logoSrc}
            logoAlt={logoAlt}
            brandName={brandName}
            icons={icons}
            locales={locales}
            showLanguageSwitcher={showLanguageSwitcher}
            hamburgerLabel={hamburgerLabel}
            classNames={classNames}
          />
        </div>
      </div>

      {/* Dropdown menu */}
      <nav
        className={cn(
          'bg-neutral-900 text-neutral-100 z-20 transform px-5 pt-16 font-semibold transition-all duration-500 ease-in-out',
          isStickyVisible ? 'fixed top-0 right-0 left-0' : 'absolute inset-x-0 top-0',
          isMenuOpen
            ? 'max-h-screen translate-y-0 opacity-100 shadow-md'
            : 'pointer-events-none max-h-0 -translate-y-10 opacity-0',
          classNames.mobileMenu
        )}
      >
        <ul className='sm:text-lg mx-auto my-5 w-fit space-y-5 text-base'>
          {items.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                'mx-auto w-fit text-center uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer',
                isActive(item.href) ? 'border-b-2 border-neutral-100' : '',
                classNames.mobileMenuItem
              )}
            >
              <Link
                ref={idx === 0 ? firstLinkRef : undefined}
                aria-label={item.ariaLabel}
                onClick={() => setIsMenuOpen(false)}
                href={item.href}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {decorativeBorderSrc && (
          <Image
            src={decorativeBorderSrc}
            loading='lazy'
            alt=''
            aria-hidden='true'
            role='presentation'
            tabIndex={-1}
            draggable={false}
            width={1920}
            height={120}
            className='min-[320px]:-bottom-12 min-[375px]:-bottom-18 min-[425px]:-bottom-24 sm:-bottom-28 md:-bottom-28 pointer-events-none absolute right-0 -bottom-10 left-0 -z-10 h-auto w-screen drop-shadow-[0_1px_0_rgba(55,65,81,0.2)] select-none'
          />
        )}
      </nav>

      {/* Overlay to close menu on outside click */}
      <button
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          'fixed inset-0 z-10 bg-black/20 transition-opacity',
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
          classNames.mobileOverlay
        )}
      />
    </div>
  );
}

// ─── Base mobile bar (rendered twice: static + sticky) ────────────────────────

type BaseNavbarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  homeHref: string;
  logoSrc: InternalNavbarProps['logoSrc'];
  logoAlt: string;
  brandName?: string;
  icons: InternalNavbarProps['icons'];
  locales: string[];
  showLanguageSwitcher: boolean;
  hamburgerLabel: string;
  classNames: NonNullable<InternalNavbarProps['classNames']>;
};

function BaseNavbar({
  isMenuOpen,
  setIsMenuOpen,
  homeHref,
  logoSrc,
  logoAlt,
  brandName,
  icons = [],
  locales,
  showLanguageSwitcher,
  hamburgerLabel,
  classNames,
}: BaseNavbarProps) {
  return (
    <div className='flex items-center justify-between'>
      {/* Left: language switcher */}
      <div className='flex-1'>
        <div className='flex items-center space-x-4'>
          {showLanguageSwitcher && icons.length > 0 && (
            <Suspense fallback={null}>
              <LanguageSwitcher
                icons={icons}
                locales={locales}
                classNames={{
                  container: classNames.languageSwitcher,
                  flagIcon: classNames.flagIcon,
                }}
              />
            </Suspense>
          )}
        </div>
      </div>

      {/* Center: logo */}
      <Link
        href={homeHref}
        className={cn('flex flex-1 items-center justify-center gap-2', classNames.logoWrapper)}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={56}
          height={56}
          loading='lazy'
          className={cn('lg:size-14 size-8 rounded-full shadow-xl', classNames.logo)}
        />
        {brandName && (
          <span className={cn('text-sm font-semibold', classNames.brandName)}>
            {brandName}
          </span>
        )}
      </Link>

      {/* Right: hamburger */}
      <div className={cn('text-neutral-100 flex-1 flex justify-end', classNames.hamburger)}>
        <Hamburger
          rounded
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
          size={20}
          color='currentColor'
          label={hamburgerLabel}
          direction='right'
        />
      </div>
    </div>
  );
}
