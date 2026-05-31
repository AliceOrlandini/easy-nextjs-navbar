import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '../lib/cn';
import type { InternalNavbarProps, NavbarLayout } from '../types';

const StickyReveal = dynamic(() => import('./sticky-reveal.client'));
const LanguageSwitcher = dynamic(() => import('./language-switcher.client'));
const NavItems = dynamic(() => import('./desktop-nav-items.client'));

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
    gridCols: 'grid-cols-[1fr_auto_1fr]',
    slots: ['logo', 'nav', 'actions'],
    navJustify: 'justify-end',
    actionsJustify: 'justify-end',
  },
  'logo-right': {
    gridCols: 'grid-cols-[1fr_auto_1fr]',
    slots: ['actions', 'nav', 'logo'],
    navJustify: 'justify-end',
    actionsJustify: 'justify-start',
  }
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
    activeMatchMode = 'exact',
    showBackground,
    ctaPlacement = 'actions',
    decorativeBorderSrc,
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
        className={cn('size-8', classNames.logo)}
      />
      {brandName && (
        <span className={cn('text-sm text-neutral-500', classNames.brandName, showBackground && classNames.brandNameSticky)}>
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
      {cta && ctaPlacement === 'actions' && (
        <Link
          href={cta.href}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors border border-slate-200',
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
    <div className={cn('flex min-w-0 items-center overflow-hidden', config.navJustify)}>
      <NavItems items={items} isSticky={showBackground} activeMatchMode={activeMatchMode} classNames={{ link: classNames.link, linkSticky: classNames.linkSticky, linkActive: classNames.linkActive }} />
      {cta && ctaPlacement === 'nav' && (
        <div className='ml-4'>
          <Link
            href={cta.href}
            className={cn(
              'inline-flex items-center text-neutral-500 gap-2 px-3 py-1 text-sm transition-colors border border-neutral-200',
              classNames.cta
            )}
          >
            {cta.title}
            {cta.icon}
          </Link>
        </div>
      )}
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
    <div>
      <nav
        className={cn(
          `grid max-h-20 items-center px-10 py-3 ${config.gridCols}`,
          classNames.nav,
          showBackground && classNames.stickyBar
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
          className='pointer-events-none absolute right-0 left-0 -z-10 h-auto w-screen drop-shadow-[0_1px_0_rgba(55,65,81,0.2)] select-none'
        />
      )}
    </div>
  );
}
