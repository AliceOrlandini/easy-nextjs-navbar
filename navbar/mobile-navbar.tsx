'use client';
import Link from 'next/link';
import Logo from '@/public/logo.webp';
import Image from 'next/image';
import { Squash as Hamburger } from 'hamburger-react';
import { Suspense } from 'react';
import { useEffect, useState, useRef, SetStateAction, Dispatch } from 'react';
import { Button } from '@/components/ui/button';
import shreddedPaperTopDarkGreen from '@/public/svg/shredded-paper-top_dark_green.svg';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import dynamic from 'next/dynamic';

const LanguageSwitcher = dynamic(
  () => import('@/components/layout/navbar/language-switcher.client')
);

type Dictionary = {
  icons: { src: string; target: string; alt: string }[];
  items: { title: string; href: string; ariaLabel: string }[]; // href without language prefix (es. "/agricoltura")
  cta: { title: string; href: string }; // idem
  logoAlt: string;
};

import { useScrollThreshold } from '@/hooks/use-scroll-threshold';

export default function MobileNavbar({
  lang,
  dict
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isStickyVisible = useScrollThreshold(500);
  const pathname = usePathname() ?? '/';
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const itemsLocalized = dict.items.map((i) => ({
    ...i,
    href: i.href === '/' ? `/${lang}` : `/${lang}${i.href}`
  }));
  const homeHref = `/${lang}`;

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

  // Close menu on Escape key press and focus first link when menu opens
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      // this is done for accessibility reasons, to allow closing the menu with the keyboard
      // and to focus the first link when the menu opens for screen readers users
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
    <div className='font-montserrat desktop:hidden'>
      {/* Mobile Navbar On Top */}
      <div className='relative isolate z-30 w-full px-5 py-3'>
        <BaseNavbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          dict={dict}
          homeHref={`/${lang}`}
        />
      </div>

      {/* Mobile Sticky Navbar */}
      <div
        className={`fixed top-0 right-0 left-0 z-50 max-w-screen transition-transform duration-300 ease-in-out ${isStickyVisible ? 'translate-y-0' : '-translate-y-full'} `}
      >
        <div
          className={`bg-dark-green h-fit max-w-screen p-5 ${isStickyVisible && !isMenuOpen ? 'shadow-md' : ''}`}
        >
          <BaseNavbar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            dict={dict}
            homeHref={homeHref}
          />
        </div>
      </div>

      {/* Dropdown menu */}
      <nav
        className={`bg-dark-green text-tertiary ${isStickyVisible ? 'fixed top-0 right-0 left-0' : 'absolute inset-x-0 top-0'} z-20 transform px-5 pt-16 font-semibold transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen translate-y-0 opacity-100 shadow-md' : 'pointer-events-none max-h-0 -translate-y-10 opacity-0'} `}
      >
        <ul className='tablet:text-lg mx-auto my-5 w-fit space-y-5 text-base'>
          {itemsLocalized.map(
            (item: { title: string; href: string; ariaLabel: string }, idx) => {
              return (
                <li
                  key={idx}
                  className={`${isActive(item.href) ? 'border-tertiary border-b-2' : ''} mx-auto w-fit text-center uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer`}
                >
                  <Link
                    aria-label={item.ariaLabel}
                    onClick={() => setIsMenuOpen(false)}
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
        <Image
          src={shreddedPaperTopDarkGreen}
          loading='lazy'
          alt=''
          aria-hidden='true'
          role='presentation'
          tabIndex={-1}
          draggable={false}
          className='very-small-smartphone:-bottom-12 small-smartphone:-bottom-18 large-smartphone:-bottom-24 tablet:-bottom-28 tablet-landscape:-bottom-28 pointer-events-none absolute right-0 -bottom-10 left-0 -z-10 h-auto w-screen drop-shadow-[0_1px_0_rgba(55,65,81,0.2)] select-none'
        />
      </nav>

      {/* Clickable overlay to close menu */}
      <button
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-10 bg-black/20 transition-opacity ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />
    </div>
  );
}

type BaseNavbarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  dict: Dictionary;
  homeHref: string;
};

function BaseNavbar({
  isMenuOpen,
  setIsMenuOpen,
  dict,
  homeHref
}: BaseNavbarProps) {
  return (
    <div className='flex items-center justify-between'>
      {/* Left: switcher + CTA */}
      <div className='desktop:flex-1'>
        <div className='flex items-center space-x-4'>
          <Suspense fallback={null}>
            <LanguageSwitcher icons={dict.icons} />
          </Suspense>
        </div>
      </div>

      {/* Center: logo */}
      <Button
        asChild
        className='flex flex-1 justify-center'
        variant='ghost'
        size='none'
      >
        <Link href={homeHref}>
          <Image
            src={Logo}
            alt={dict.logoAlt}
            className='desktop:size-14 size-8 rounded-full shadow-xl'
            loading='lazy'
          />
        </Link>
      </Button>

      {/* Right: hamburger menu */}
      <div className='text-tertiary'>
        <Hamburger
          rounded
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
          size={20}
          color='currentColor'
          label='apri/chiudi menu'
          direction='right'
        />
      </div>
    </div>
  );
}
