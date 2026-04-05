import { cn } from './chunk-4QY7C7TB.js';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { jsx } from 'react/jsx-runtime';

function withLocale(pathname, target, locales) {
  const seg = pathname.split("/");
  if (locales.includes(seg[1])) seg[1] = target;
  else seg.splice(1, 0, target);
  return seg.join("/") || `/${target}`;
}
function LanguageSwitcher({
  icons,
  locales,
  classNames
}) {
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search.toString();
  const suffix = qs ? `?${qs}` : "";
  const remember = (loc) => {
    document.cookie = `locale=${loc}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };
  return /* @__PURE__ */ jsx("div", { className: cn("flex space-x-4", classNames?.container), children: icons.map((icon, idx) => {
    const href = withLocale(pathname, icon.locale, locales) + suffix;
    return /* @__PURE__ */ jsx(
      Link,
      {
        href,
        prefetch: false,
        className: "inline-flex items-center",
        onClick: (e) => {
          e.preventDefault();
          remember(icon.locale);
          window.location.assign(href);
        },
        children: /* @__PURE__ */ jsx(
          Image,
          {
            loading: "lazy",
            src: icon.src,
            alt: icon.alt,
            width: 24,
            height: 24,
            className: cn("size-6", classNames?.flagIcon)
          }
        )
      },
      idx
    );
  }) });
}

export { LanguageSwitcher as default };
//# sourceMappingURL=language-switcher.client-F4LWMLAN.js.map
//# sourceMappingURL=language-switcher.client-F4LWMLAN.js.map