'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '../lib/cn';
import type { NavbarIcon } from '../types';

type LanguageSwitcherProps = {
  icons: NavbarIcon[];
  /** Derived from icons[].locale by the Navbar orchestrator */
  locales: string[];
  classNames?: {
    container?: string;
    flagIcon?: string;
  };
};

function withLocale(pathname: string, target: string, locales: string[]) {
  const seg = pathname.split('/');
  if (locales.includes(seg[1])) seg[1] = target;
  else seg.splice(1, 0, target);
  return seg.join('/') || `/${target}`;
}

export default function LanguageSwitcher({
  icons,
  locales,
  classNames,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search.toString();
  const suffix = qs ? `?${qs}` : '';

  const remember = (loc: string) => {
    document.cookie = `locale=${loc}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  return (
    <div className={cn('flex space-x-4', classNames?.container)}>
      {icons.map((icon, idx) => {
        const href = withLocale(pathname, icon.locale, locales) + suffix;
        return (
          <Link
            key={idx}
            href={href}
            prefetch={false}
            className='inline-flex items-center'
            onClick={(e) => {
              e.preventDefault();
              remember(icon.locale);
              window.location.assign(href);
            }}
          >
            <Image
              loading='lazy'
              src={icon.src}
              alt={icon.alt}
              width={24}
              height={24}
              className={cn('lg:size-6 size-5 hover:scale-110 transition-transform duration-300', classNames?.flagIcon)}
            />
          </Link>
        );
      })}
    </div>
  );
}
