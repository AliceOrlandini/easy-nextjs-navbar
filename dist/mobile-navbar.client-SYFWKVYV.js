import { useScrollThreshold } from './chunk-Q45LC5O3.js';
import { cn } from './chunk-4QY7C7TB.js';
import Link from 'next/link';
import Image from 'next/image';
import { Squash } from 'hamburger-react';
import { useState, useRef, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { jsxs, jsx } from 'react/jsx-runtime';

var LanguageSwitcher = dynamic(() => import('./language-switcher.client-F4LWMLAN.js'));
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isStickyVisible = useScrollThreshold(mobileStickyThreshold);
  const pathname = usePathname() ?? "/";
  const firstLinkRef = useRef(null);
  useEffect(() => {
    const { body } = document;
    if (isMenuOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: cn("font-montserrat desktop:hidden", classNames.container), children: [
    /* @__PURE__ */ jsx("div", { className: "relative isolate z-30 w-full px-5 py-3", children: /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "fixed top-0 right-0 left-0 z-50 max-w-screen transition-transform duration-300 ease-in-out",
          isStickyVisible ? "translate-y-0" : "-translate-y-full"
        ),
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "bg-dark-green h-fit max-w-screen p-5",
              isStickyVisible && !isMenuOpen ? "shadow-md" : "",
              classNames.stickyBar
            ),
            children: /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsxs(
      "nav",
      {
        className: cn(
          "bg-dark-green text-tertiary z-20 transform px-5 pt-16 font-semibold transition-all duration-500 ease-in-out",
          isStickyVisible ? "fixed top-0 right-0 left-0" : "absolute inset-x-0 top-0",
          isMenuOpen ? "max-h-screen translate-y-0 opacity-100 shadow-md" : "pointer-events-none max-h-0 -translate-y-10 opacity-0",
          classNames.mobileMenu
        ),
        children: [
          /* @__PURE__ */ jsx("ul", { className: "tablet:text-lg mx-auto my-5 w-fit space-y-5 text-base", children: items.map((item, idx) => /* @__PURE__ */ jsx(
            "li",
            {
              className: cn(
                "mx-auto w-fit text-center uppercase transition-transform duration-300 hover:scale-110 hover:cursor-pointer",
                isActive(item.href) ? "border-b-2 border-tertiary" : "",
                classNames.mobileMenuItem
              ),
              children: /* @__PURE__ */ jsx(
                Link,
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
          decorativeBorderSrc && /* @__PURE__ */ jsx(
            Image,
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
    /* @__PURE__ */ jsx(
      "button",
      {
        "aria-hidden": !isMenuOpen,
        tabIndex: -1,
        onClick: () => setIsMenuOpen(false),
        className: cn(
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
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: showLanguageSwitcher && icons.length > 0 && /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: homeHref,
        className: cn("flex flex-1 items-center justify-center gap-2", classNames.logoWrapper),
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
    ),
    /* @__PURE__ */ jsx("div", { className: cn("text-tertiary flex-1 flex justify-end", classNames.hamburger), children: /* @__PURE__ */ jsx(
      Squash,
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

export { MobileNavbar as default };
//# sourceMappingURL=mobile-navbar.client-SYFWKVYV.js.map
//# sourceMappingURL=mobile-navbar.client-SYFWKVYV.js.map