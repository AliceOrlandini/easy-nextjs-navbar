import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '../lib/cn';
import type { InternalNavbarProps, NavbarLayout } from '../types';

const StickyReveal = dynamic(() => import('./sticky-reveal.client'));
const LanguageSwitcher = dynamic(() => import('./language-switcher.client'));
const NavItems = dynamic(() =>
  import('./desktop-nav-items.client').then((mod) => mod.NavItems)
);

// ─── Layout config ────────────────────────────────────────────────────────────

type SlotName = 'logo' | 'actions' | 'nav';

type LayoutConfig = {
  gridCols: string;
  slots: [SlotName, SlotName, SlotName]; // left → center → right
  navJustify: string;
  actionsJustify: string;
};

const LAYOUT_CONFIG: Record<NavbarLayout, LayoutConfig> = {
  'logo-center': {
    gridCols: 'grid-cols-[1fr_auto_1fr]',
    slots: ['actions', 'logo', 'nav'],
    navJustify: 'justify-end',
    actionsJustify: 'justify-start',
  },
  'logo-left': {
    gridCols: 'grid-cols-[auto_1fr_auto]',
    slots: ['logo', 'nav', 'actions'],
    navJustify: 'justify-center',
    actionsJustify: 'justify-end',
  },
  'logo-right': {
    gridCols: 'grid-cols-[auto_1fr_auto]',
    slots: ['actions', 'nav', 'logo'],
    navJustify: 'justify-center',
    actionsJustify: 'justify-start',
  },
};

// ─── Desktop Navbar (Server Component) ───────────────────────────────────────

export default function DesktopNavbar(props: InternalNavbarProps) {
  const {
    items,
    cta,
    homeHref,
    stickyThreshold = '100vh',
    classNames = {},
  } = props;

  return (
    <div className={cn('lg:block hidden', classNames.container)}>
      {/* Navbar on top */}
      <BaseNavbar {...props} />

      {/* Sticky version that slides in after scrolling */}
      <StickyReveal threshold={stickyThreshold} className={classNames.stickyBar}>
        <BaseNavbar {...props} showBackground />
      </StickyReveal>
    </div>
  );

  // suppress unused-var warnings — props are destructured for JSX above
  void items; void cta; void homeHref;
}

// ─── Base layout (rendered twice: static + sticky) ───────────────────────────

function BaseNavbar(props: InternalNavbarProps & { showBackground?: boolean }) {
  const {
    items,
    cta,
    homeHref,
    logoSrc,
    logoAlt,
    brandName,
    icons = [],
    locales,
    showLanguageSwitcher = true,
    layout = 'logo-center',
    classNames = {},
    showBackground,
  } = props;

  const config = LAYOUT_CONFIG[layout];

  // ── Slot contents ──────────────────────────────────────────────────────────

  const LogoSlot = (
    <Link
      href={homeHref}
      className={cn('inline-flex items-center gap-2', classNames.logoWrapper)}
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
  );

  const ActionsSlot = (
    <div className={cn('flex items-center gap-4', classNames.languageSwitcher)}>
      {showLanguageSwitcher && icons.length > 0 && (
        <Suspense fallback={null}>
          <LanguageSwitcher
            icons={icons}
            locales={locales}
            classNames={{ flagIcon: classNames.flagIcon }}
          />
        </Suspense>
      )}
      {cta && (
        <Link
          href={cta.href}
          className={cn(
            'inline-flex items-center gap-2 border border-white/30 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10',
            classNames.cta
          )}
        >
          {cta.title}
          {cta.icon}
        </Link>
      )}
    </div>
  );

  const NavSlot = (
    <div className={cn('lg:flex hidden min-w-0 overflow-hidden', config.navJustify)}>
      <NavItems items={items} classNames={{ link: classNames.link, linkActive: classNames.linkActive }} />
    </div>
  );

  // ── Map slot names to elements ─────────────────────────────────────────────

  const slotElements: Record<SlotName, React.ReactNode> = {
    logo: LogoSlot,
    actions: ActionsSlot,
    nav: NavSlot,
  };

  const [leftSlot, centerSlot, rightSlot] = config.slots;

  return (
    <nav
      className={cn(
        `grid max-h-20 items-center px-10 py-3 ${config.gridCols}`,
        showBackground ? 'bg-neutral-900' : 'bg-transparent',
        classNames.nav
      )}
    >
      <div className='z-50 flex min-w-0 items-center gap-4'>
        {slotElements[leftSlot]}
      </div>
      <div className='z-50 flex justify-center'>
        {slotElements[centerSlot]}
      </div>
      <div className={cn('z-50 flex min-w-0', config.navJustify)}>
        {slotElements[rightSlot]}
      </div>
    </nav>
  );
}
