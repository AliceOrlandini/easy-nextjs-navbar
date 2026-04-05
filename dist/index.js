export { useScrollThreshold } from './chunk-Q45LC5O3.js';
import dynamic from 'next/dynamic';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

var DesktopNavbar = dynamic(() => import('./desktop-navbar-RR5PHU35.js'));
var MobileNavbar = dynamic(() => import('./mobile-navbar.client-6OOGRS5U.js'));
function Navbar({
  locale,
  items,
  cta,
  icons,
  ...rest
}) {
  const prefixHref = (href) => {
    if (!locale) return href;
    return href === "/" ? `/${locale}` : `/${locale}${href}`;
  };
  const localizedItems = items.map((i) => ({ ...i, href: prefixHref(i.href) }));
  const localizedCta = cta ? { ...cta, href: prefixHref(cta.href) } : void 0;
  const homeHref = locale ? `/${locale}` : "/";
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