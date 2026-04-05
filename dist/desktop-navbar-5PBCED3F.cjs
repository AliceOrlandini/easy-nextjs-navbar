'use strict';

var chunkNSB5KGE4_cjs = require('./chunk-NSB5KGE4.cjs');
var Link = require('next/link');
var Image = require('next/image');
var react = require('react');
var dynamic = require('next/dynamic');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);
var Image__default = /*#__PURE__*/_interopDefault(Image);
var dynamic__default = /*#__PURE__*/_interopDefault(dynamic);

var StickyReveal = dynamic__default.default(() => import('./sticky-reveal.client-ANJUIOLU.cjs'));
var LanguageSwitcher = dynamic__default.default(() => import('./language-switcher.client-V5FJVNYG.cjs'));
var NavItems = dynamic__default.default(
  () => import('./desktop-nav-items.client-YDWW4OGW.cjs').then((mod) => mod.NavItems)
);
var LAYOUT_CONFIG = {
  "logo-center": {
    gridCols: "grid-cols-[1fr_auto_1fr]",
    slots: ["actions", "logo", "nav"],
    navJustify: "justify-end",
    actionsJustify: "justify-start"
  },
  "logo-left": {
    gridCols: "grid-cols-[auto_1fr_auto]",
    slots: ["logo", "nav", "actions"],
    navJustify: "justify-center",
    actionsJustify: "justify-end"
  },
  "logo-right": {
    gridCols: "grid-cols-[auto_1fr_auto]",
    slots: ["actions", "nav", "logo"],
    navJustify: "justify-center",
    actionsJustify: "justify-start"
  }
};
function DesktopNavbar(props) {
  const {
    items,
    cta,
    homeHref,
    stickyThreshold = "100vh",
    classNames = {}
  } = props;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkNSB5KGE4_cjs.cn("font-montserrat desktop:block hidden", classNames.container), children: [
    /* @__PURE__ */ jsxRuntime.jsx(BaseNavbar, { ...props }),
    /* @__PURE__ */ jsxRuntime.jsx(StickyReveal, { threshold: stickyThreshold, className: classNames.stickyBar, children: /* @__PURE__ */ jsxRuntime.jsx(BaseNavbar, { ...props, showBackground: true }) })
  ] });
}
function BaseNavbar(props) {
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
    layout = "logo-center",
    classNames = {},
    showBackground
  } = props;
  const config = LAYOUT_CONFIG[layout];
  const LogoSlot = /* @__PURE__ */ jsxRuntime.jsxs(
    Link__default.default,
    {
      href: homeHref,
      className: chunkNSB5KGE4_cjs.cn("inline-flex items-center gap-2", classNames.logoWrapper),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Image__default.default,
          {
            src: logoSrc,
            alt: logoAlt,
            width: 56,
            height: 56,
            loading: "lazy",
            className: chunkNSB5KGE4_cjs.cn("desktop:size-14 size-8 rounded-full shadow-xl", classNames.logo)
          }
        ),
        brandName && /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkNSB5KGE4_cjs.cn("text-sm font-semibold", classNames.brandName), children: brandName })
      ]
    }
  );
  const ActionsSlot = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkNSB5KGE4_cjs.cn("flex items-center gap-4", classNames.languageSwitcher), children: [
    showLanguageSwitcher && icons.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(react.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntime.jsx(
      LanguageSwitcher,
      {
        icons,
        locales,
        classNames: { flagIcon: classNames.flagIcon }
      }
    ) }),
    cta && /* @__PURE__ */ jsxRuntime.jsxs(
      Link__default.default,
      {
        href: cta.href,
        className: chunkNSB5KGE4_cjs.cn(
          "inline-flex items-center gap-2 border border-white/30 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10",
          classNames.cta
        ),
        children: [
          cta.title,
          cta.icon
        ]
      }
    )
  ] });
  const NavSlot = /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkNSB5KGE4_cjs.cn("desktop:flex hidden min-w-0 overflow-hidden", config.navJustify), children: /* @__PURE__ */ jsxRuntime.jsx(NavItems, { items, classNames: { link: classNames.link, linkActive: classNames.linkActive } }) });
  const slotElements = {
    logo: LogoSlot,
    actions: ActionsSlot,
    nav: NavSlot
  };
  const [leftSlot, centerSlot, rightSlot] = config.slots;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "nav",
    {
      className: chunkNSB5KGE4_cjs.cn(
        `grid max-h-20 items-center px-10 py-3 ${config.gridCols}`,
        showBackground ? "bg-dark-green" : "bg-transparent",
        classNames.nav
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "z-50 flex min-w-0 items-center gap-4", children: slotElements[leftSlot] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "z-50 flex justify-center", children: slotElements[centerSlot] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkNSB5KGE4_cjs.cn("z-50 flex min-w-0", config.navJustify), children: slotElements[rightSlot] })
      ]
    }
  );
}

module.exports = DesktopNavbar;
//# sourceMappingURL=desktop-navbar-5PBCED3F.cjs.map
//# sourceMappingURL=desktop-navbar-5PBCED3F.cjs.map