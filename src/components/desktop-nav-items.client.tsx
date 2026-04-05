'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/cn';
import type { NavbarItem } from '../types';

type NavItemsProps = {
  items: NavbarItem[];
  classNames?: {
    link?: string;
    linkActive?: string;
  };
};

export default function NavItems({ items, classNames }: NavItemsProps) {
  const pathname = usePathname() ?? '/';
  const isActive = (href: string) => pathname === href;

  return (
    <ul className='m-0 flex min-w-0 list-none flex-nowrap items-center gap-x-6 p-0'>
      {items.map((item, idx) => (
        <li
          key={idx}
          className={cn(
            'my-auto min-w-0',
            isActive(item.href)
              ? cn('border-b-2 border-neutral-100', classNames?.linkActive)
              : ''
          )}
        >
          <Link
            aria-label={item.ariaLabel}
            href={item.href}
            className={cn(
              'wrap-break-words inline-flex max-w-[18ch] min-w-0 items-center text-center text-sm font-medium leading-tight whitespace-normal transition-colors hover:opacity-80',
              isActive(item.href) ? 'pointer-events-none' : '',
              classNames?.link
            )}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
