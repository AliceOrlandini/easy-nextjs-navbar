import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Logo from '@/public/logo.webp';
import { Locale } from '@/lib/i18n';
import { Send } from 'lucide-react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const StickyReveal = dynamic(
  () => import('@/components/layout/navbar/sticky-reveal.client')
);

const LanguageSwitcher = dynamic(
  () => import('@/components/layout/navbar/language-switcher.client')
);

const NavItems = dynamic(() =>
  import('@/components/layout/navbar/desktop-nav-items.client').then(
    (mod) => mod.NavItems
  )
);

type Dictionary = {
  icons: { src: string; target: string; alt: string }[];
  items: { title: string; href: string; ariaLabel: string }[]; // href without language prefix (es. "/agricoltura")
  cta: { title: string; href: string }; // idem
  logoAlt: string;
};

export default function DesktopNavbar({
  lang,
  dict
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  // prefix the href with the language: so the Links work also on the client
  const itemsLocalized = dict.items.map((i) => ({
    ...i,
    href: i.href === '/' ? `/${lang}` : `/${lang}${i.href}`
  }));
  const homeHref = `/${lang}`;

  return (
    <div className='font-montserrat desktop:block hidden'>
      {/* Navbar top */}
      <BaseNavbar
        dict={dict}
        itemsLocalized={itemsLocalized}
        ctaHref={dict.cta.href}
        homeHref={homeHref}
      />

      {/* Sticky that appears after 1 viewport */}
      <StickyReveal>
        <BaseNavbar
          dict={dict}
          itemsLocalized={itemsLocalized}
          ctaHref={dict.cta.href}
          homeHref={homeHref}
          showBackground
        />
      </StickyReveal>
    </div>
  );

  function BaseNavbar({
    dict,
    itemsLocalized,
    ctaHref,
    homeHref,
    showBackground
  }: {
    dict: Dictionary;
    itemsLocalized: { title: string; href: string; ariaLabel: string }[];
    ctaHref: string;
    homeHref: string;
    showBackground?: boolean;
  }) {
    return (
      <div>
        <nav
          className={`grid max-h-20 grid-cols-[1fr_auto_1fr] items-center px-10 py-3 ${showBackground ? 'bg-dark-green' : 'bg-transparent'}`}
        >
          {/* Left: switcher + CTA */}
          <div className='z-50 flex min-w-0 items-center gap-4'>
            <Suspense fallback={null}>
              <LanguageSwitcher icons={dict.icons} />
            </Suspense>
            <Button asChild variant='overlay' size='base'>
              <Link href={ctaHref}>
                {dict.cta.title} <Send />
              </Link>
            </Button>
          </div>

          {/* Center: logo */}
          <Button
            asChild
            variant='ghost'
            size='none'
            className='z-50 justify-center'
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

          {/* Right: menu */}
          <div className='desktop:flex z-50 hidden min-w-0 justify-end overflow-hidden'>
            <NavItems items={itemsLocalized} />
          </div>
        </nav>
      </div>
    );
  }
}
