export { useScrollThreshold } from './chunk-Q45LC5O3.js';
import dynamic from 'next/dynamic';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

var DesktopNavbar = dynamic(() => import('./desktop-navbar-WBK4S7LK.js'));
var MobileNavbar = dynamic(() => import('./mobile-navbar.client-QVROG75E.js'));
function Navbar({
  locale,
  items,
  cta,
  icons,
  ...rest
}) {
  const localizedItems = items.map((i) => ({
    ...i,
    href: i.href === "/" ? `/${locale}` : `/${locale}${i.href}`
  }));
  const localizedCta = cta ? {
    ...cta,
    href: cta.href === "/" ? `/${locale}` : `/${locale}${cta.href}`
  } : void 0;
  const homeHref = `/${locale}`;
  const locales = (icons ?? []).map((i) => i.locale);
  const internalProps = {
    ...rest,
    items: localizedItems,
    cta: localizedCta,
    homeHref,
    locales,
    icons
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DesktopNavbar, { ...internalProps }),
    /* @__PURE__ */ jsx(MobileNavbar, { ...internalProps })
  ] });
}

export { Navbar };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map