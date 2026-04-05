'use strict';

var chunk2KZFQDFU_cjs = require('./chunk-2KZFQDFU.cjs');
var chunkNSB5KGE4_cjs = require('./chunk-NSB5KGE4.cjs');
var Link = require('next/link');
var Image = require('next/image');
var hamburgerReact = require('hamburger-react');
var react = require('react');
var navigation = require('next/navigation');
var dynamic = require('next/dynamic');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);
var Image__default = /*#__PURE__*/_interopDefault(Image);
var dynamic__default = /*#__PURE__*/_interopDefault(dynamic);

var LanguageSwitcher = dynamic__default.default(() => import('./language-switcher.client-V5FJVNYG.cjs'));
function MobileNavbar({
  items,
  icons = [],
  locales,
  cta,
  homeHref,
  logoSrc,
  logoAlt,
  brandName,
  showLanguageSwitcher = true,
  decorativeBorderSrc,
  hamburgerLabel = "Open/close menu",
  mobileStickyThreshold = 500,
  classNames = {}
}) {
  const [isMenuOpen, setIsMenuOpen] = react.useState(false);
  const isStickyVisible = chunk2KZFQDFU_cjs.useScrollThreshold(mobileStickyThreshold);
  const pathname = navigation.usePathname() ?? "/";
  const firstLinkRef = react.useRef(null);
  react.useEffect(() => {
    const { body } = document;
    if (isMenuOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);
  react.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", onKeyDown);
      const id = setTimeout(() => firstLinkRef.current?.focus(), 10);
      return () => {
        clearTimeout(id);
        document.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isMenuOpen]);
  const isActive = (href) => pathname === href;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkNSB5KGE4_cjs.cn("font-montserrat desktop:hidden", classNames.container), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative isolate z-30 w-full px-5 py-3", children: /* @__PURE__ */ jsxRuntime.jsx(
      BaseNavbar,
      {
        isMenuOpen,
        setIsMenuOpen,
        homeHref,
        logoSrc,
        logoAlt,
        brandName,
        icons,
        locales,
        showLanguageSwitcher,
        hamburgerLabel,
        classNames
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: chunkNSB5KGE4_cjs.cn(
          "fixed top-0 right-0 left-0 z-50 max-w-screen transition-transform duration-300 ease-in-out",
          isStickyVisible ? "translate-y-0" : "-translate-y-full"
        ),
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: chunkNSB5KGE4_cjs.cn(
              "bg-dark-green h-fit max-w-screen p-5",
              isStickyVisible && !isMenuOpen ? "shadow-md" : "",
              classNames.stickyBar
            ),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              BaseNavbar,
              {
                isMenuOpen,
                setIsMenuOpen,
                homeHref,
                logoSrc,
                logoAlt,
                brandName,
                icons,
                locales,
                showLanguageSwitcher,
                hamburgerLabel,
                classNames
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "nav",
      {
        className: chunkNSB5KGE4_cjs.cn(
          "bg-dark-green text-tertiary z-20 transform px-5 pt-16 font-semibold transition-all duration-500 ease-in-out",
          isStickyVisible ? "fixed top-0 right-0 left-0" : "absolute inset-x-0 top-0",
          isMenuOpen ? "max-h-screen translate-y-0 opacity-100 shadow-md" : "pointer-events-none max-h-0 -translate-y-10 opacity-0",
          classNames.mobileMenu
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "tablet:text-lg mx-auto my-5 w-fit space-y-5 text-base", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntime.jsx(
            "li",
            {
              className: chunkNSB5KGE4_cjs.cn(
                "mx-auto w-fit text-center uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer",
                isActive(item.href) ? "border-b-2 border-tertiary" : "",
                classNames.mobileMenuItem
              ),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                Link__default.default,
                {
                  ref: idx === 0 ? firstLinkRef : void 0,
                  "aria-label": item.ariaLabel,
                  onClick: () => setIsMenuOpen(false),
                  href: item.href,
                  children: item.title
                }
              )
            },
            idx
          )) }),
          decorativeBorderSrc && /* @__PURE__ */ jsxRuntime.jsx(
            Image__default.default,
            {
              src: decorativeBorderSrc,
              loading: "lazy",
              alt: "",
              "aria-hidden": "true",
              role: "presentation",
              tabIndex: -1,
              draggable: false,
              width: 1920,
              height: 120,
              className: "very-small-smartphone:-bottom-12 small-smartphone:-bottom-18 large-smartphone:-bottom-24 tablet:-bottom-28 tablet-landscape:-bottom-28 pointer-events-none absolute right-0 -bottom-10 left-0 -z-10 h-auto w-screen drop-shadow-[0_1px_0_rgba(55,65,81,0.2)] select-none"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        "aria-hidden": !isMenuOpen,
        tabIndex: -1,
        onClick: () => setIsMenuOpen(false),
        className: chunkNSB5KGE4_cjs.cn(
          "fixed inset-0 z-10 bg-black/20 transition-opacity",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          classNames.mobileOverlay
        )
      }
    )
  ] });
}
function BaseNavbar({
  isMenuOpen,
  setIsMenuOpen,
  homeHref,
  logoSrc,
  logoAlt,
  brandName,
  icons = [],
  locales,
  showLanguageSwitcher,
  hamburgerLabel,
  classNames
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center space-x-4", children: showLanguageSwitcher && icons.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(react.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntime.jsx(
      LanguageSwitcher,
      {
        icons,
        locales,
        classNames: {
          container: classNames.languageSwitcher,
          flagIcon: classNames.flagIcon
        }
      }
    ) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      Link__default.default,
      {
        href: homeHref,
        className: chunkNSB5KGE4_cjs.cn("flex flex-1 items-center justify-center gap-2", classNames.logoWrapper),
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
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkNSB5KGE4_cjs.cn("text-tertiary flex-1 flex justify-end", classNames.hamburger), children: /* @__PURE__ */ jsxRuntime.jsx(
      hamburgerReact.Squash,
      {
        rounded: true,
        toggled: isMenuOpen,
        toggle: setIsMenuOpen,
        size: 20,
        color: "currentColor",
        label: hamburgerLabel,
        direction: "right"
      }
    ) })
  ] });
}

module.exports = MobileNavbar;
//# sourceMappingURL=mobile-navbar.client-JQVTETPJ.cjs.map
//# sourceMappingURL=mobile-navbar.client-JQVTETPJ.cjs.map