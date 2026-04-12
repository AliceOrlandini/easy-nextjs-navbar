import type {
  NavbarItem,
  NavbarIcon,
  NavbarCta,
  InternalNavbarProps,
} from "../../types";

// ─── Asset paths ───

export const LOGO_SRC = "/logo.png";
export const FLAG_IT_SRC = "/flag-it.svg";
export const FLAG_EN_SRC = "/flag-en.svg";
export const DECORATIVE_SRC = "/decorative.svg";

// ─── Shared fixtures ───────────────────────────────────────────────────────────

export const sampleItemsWithLocale: NavbarItem[] = [
  { title: "Home", href: "/en", ariaLabel: "Go to home" },
  { title: "About", href: "/en/about", ariaLabel: "About us" },
  { title: "Services", href: "/en/services", ariaLabel: "Our services" },
  { title: "Contact", href: "/en/contact", ariaLabel: "Contact us" },
];

/** Items without locale prefix — consumed by the public Navbar component */
export const sampleItemsNoLocale: NavbarItem[] = [
  { title: "Home", href: "/", ariaLabel: "Go to home" },
  { title: "About", href: "/about", ariaLabel: "About us" },
  { title: "Services", href: "/services", ariaLabel: "Our services" },
  { title: "Contact", href: "/contact", ariaLabel: "Contact us" },
];

export const sampleIcons: NavbarIcon[] = [
  { src: FLAG_IT_SRC, locale: "it", alt: "Italiano" },
  { src: FLAG_EN_SRC, locale: "en", alt: "English" },
];

export const sampleCta: NavbarCta = {
  title: "Contact us",
  href: "/contact",
};

/** Internal props shape (items already localized, homeHref set) */
export const sampleInternalProps: InternalNavbarProps = {
  items: sampleItemsWithLocale,
  icons: sampleIcons,
  locales: ["it", "en"],
  cta: { ...sampleCta, href: "/it/contact" }, // TODO: check this
  homeHref: "/it",
  logoSrc: LOGO_SRC,
  logoAlt: "Navbar Logo",
  brandName: "MyBrand",
};

export const manyItems: NavbarItem[] = [
  { title: "Home", href: "/it", ariaLabel: "Home" },
  { title: "About", href: "/it/about", ariaLabel: "About" },
  { title: "Services", href: "/it/services", ariaLabel: "Services" },
  { title: "Portfolio", href: "/it/portfolio", ariaLabel: "Portfolio" },
  { title: "Blog", href: "/it/blog", ariaLabel: "Blog" },
  { title: "Careers", href: "/it/careers", ariaLabel: "Careers" },
  { title: "Press", href: "/it/press", ariaLabel: "Press" },
  { title: "Contact", href: "/it/contact", ariaLabel: "Contact" },
];
