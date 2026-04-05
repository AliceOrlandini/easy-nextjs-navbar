'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function NavItems({
  items
}: {
  items: { title: string; href: string; ariaLabel: string }[];
}) {
  const pathname = usePathname() ?? '/';
  const isActive = (href: string) => pathname === href;

  return (
    <ul className='m-0 flex min-w-0 list-none flex-nowrap items-center gap-x-6 p-0 text-shadow-md'>
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`my-auto min-w-0 ${isActive(item.href) ? 'border-tertiary border-b-2' : ''}`}
        >
          <Button
            asChild
            variant='underlay'
            size='none'
            className={`wrap-break-words max-w-[18ch] min-w-0 text-center leading-tight whitespace-normal ${isActive(item.href) ? 'transition-none hover:border-none' : ''}`}
          >
            <Link aria-label={item.ariaLabel} href={item.href}>
              {item.title}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
