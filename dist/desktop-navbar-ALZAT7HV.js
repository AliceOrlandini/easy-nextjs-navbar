import { cn } from './chunk-4QY7C7TB.js';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { jsxs, jsx } from 'react/jsx-runtime';

var StickyReveal = dynamic(() => import('./sticky-reveal.client-3QAD45GF.js'));
var LanguageSwitcher = dynamic(() => import('./language-switcher.client-F4LWMLAN.js'));
var NavItems = dynamic(
  () => import('./desktop-nav-items.client-7EW5HXXB.js').then((mod) => mod.NavItems)
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
  return /* @__PURE__ */ jsxs("div", { className: cn("font-montserrat desktop:block hidden", classNames.container), children: [
    /* @__PURE__ */ jsx(BaseNavbar, { ...props }),
    /* @__PURE__ */ jsx(StickyReveal, { threshold: stickyThreshold, className: classNames.stickyBar, children: /* @__PURE__ */ jsx(BaseNavbar, { ...props, showBackground: true }) })
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
  const LogoSlot = /* @__PURE__ */ jsxs(
    Link,
    {
      href: homeHref,
      className: cn("inline-flex items-center gap-2", classNames.logoWrapper),
      children: [
        /* @__PURE__ */ jsx(
          Image,
          {
            src: logoSrc,
            alt: logoAlt,
            width: 56,
            height: 56,
            loading: "lazy",
            className: cn("desktop:size-14 size-8 rounded-full shadow-xl", classNames.logo)
          }
        ),
        brandName && /* @__PURE__ */ jsx("span", { className: cn("text-sm font-semibold", classNames.brandName), children: brandName })
      ]
    }
  );
  const ActionsSlot = /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-4", classNames.languageSwitcher), children: [
    showLanguageSwitcher && icons.length > 0 && /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
      LanguageSwitcher,
      {
        icons,
        locales,
        classNames: { flagIcon: classNames.flagIcon }
      }
    ) }),
    cta && /* @__PURE__ */ jsxs(
      Link,
      {
        href: cta.href,
        className: cn(
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
  const NavSlot = /* @__PURE__ */ jsx("div", { className: cn("desktop:flex hidden min-w-0 overflow-hidden", config.navJustify), children: /* @__PURE__ */ jsx(NavItems, { items, classNames: { link: classNames.link, linkActive: classNames.linkActive } }) });
  const slotElements = {
    logo: LogoSlot,
    actions: ActionsSlot,
    nav: NavSlot
  };
  const [leftSlot, centerSlot, rightSlot] = config.slots;
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: cn(
        `grid max-h-20 items-center px-10 py-3 ${config.gridCols}`,
        showBackground ? "bg-dark-green" : "bg-transparent",
        classNames.nav
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "z-50 flex min-w-0 items-center gap-4", children: slotElements[leftSlot] }),
        /* @__PURE__ */ jsx("div", { className: "z-50 flex justify-center", children: slotElements[centerSlot] }),
        /* @__PURE__ */ jsx("div", { className: cn("z-50 flex min-w-0", config.navJustify), children: slotElements[rightSlot] })
      ]
    }
  );
}

export { DesktopNavbar as default };
//# sourceMappingURL=desktop-navbar-ALZAT7HV.js.map
//# sourceMappingURL=desktop-navbar-ALZAT7HV.js.map