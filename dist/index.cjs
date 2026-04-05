'use strict';

var chunk2KZFQDFU_cjs = require('./chunk-2KZFQDFU.cjs');
var dynamic = require('next/dynamic');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var dynamic__default = /*#__PURE__*/_interopDefault(dynamic);

var DesktopNavbar = dynamic__default.default(() => import('./desktop-navbar-IESTJHRO.cjs'));
var MobileNavbar = dynamic__default.default(() => import('./mobile-navbar.client-EOHAHG7J.cjs'));
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
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DesktopNavbar, { ...internalProps }),
    /* @__PURE__ */ jsxRuntime.jsx(MobileNavbar, { ...internalProps })
  ] });
}

Object.defineProperty(exports, "useScrollThreshold", {
  enumerable: true,
  get: function () { return chunk2KZFQDFU_cjs.useScrollThreshold; }
});
exports.Navbar = Navbar;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map