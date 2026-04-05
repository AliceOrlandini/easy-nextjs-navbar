'use client';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import italyFlag from '@/public/svg/italy.svg';
import englandFlag from '@/public/svg/england.svg';
import { locales, isOneOf, Locale } from '@/lib/i18n';

const LOGOS: Record<string, StaticImageData> = {
  italy: italyFlag,
  england: englandFlag
};

function withLocale(pathname: string, target: Locale) {
  const seg = pathname.split('/');
  if (locales.includes(seg[1] as Locale)) seg[1] = target;
  else seg.splice(1, 0, target);
  return seg.join('/') || `/${target}`;
}

type LanguageSwitcherProps = {
  icons: { src: string; target: string; alt: string }[];
};

export default function LanguageSwitcher({ icons }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search.toString();
  const suffix = qs ? `?${qs}` : '';

  const remember = (loc: Locale) => {
    document.cookie = `locale=${loc}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  return (
    <div className='flex space-x-4'>
      {icons.map((icon, idx) => {
        if (!isOneOf(locales, icon.target)) null;
        const target = icon.target as Locale;
        const href = withLocale(pathname, target) + suffix;
        return (
          <Button asChild key={idx} variant='ghost' size='none'>
            <Link
              href={href}
              prefetch={false}
              onClick={(e) => {
                e.preventDefault();
                remember(target);
                window.location.assign(href);
              }}
            >
              <Image
                loading='lazy'
                src={LOGOS[icon.src]}
                alt={icon.alt}
                className='size-6'
              />
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
