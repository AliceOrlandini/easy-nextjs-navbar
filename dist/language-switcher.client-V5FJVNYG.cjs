'use client';
'use strict';

var chunkNSB5KGE4_cjs = require('./chunk-NSB5KGE4.cjs');
var Link = require('next/link');
var Image = require('next/image');
var navigation = require('next/navigation');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);
var Image__default = /*#__PURE__*/_interopDefault(Image);

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
  const pathname = navigation.usePathname();
  const search = navigation.useSearchParams();
  const qs = search.toString();
  const suffix = qs ? `?${qs}` : "";
  const remember = (loc) => {
    document.cookie = `locale=${loc}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkNSB5KGE4_cjs.cn("flex space-x-4", classNames?.container), children: icons.map((icon, idx) => {
    const href = withLocale(pathname, icon.locale, locales) + suffix;
    return /* @__PURE__ */ jsxRuntime.jsx(
      Link__default.default,
      {
        href,
        prefetch: false,
        className: "inline-flex items-center",
        onClick: (e) => {
          e.preventDefault();
          remember(icon.locale);
          window.location.assign(href);
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(
          Image__default.default,
          {
            loading: "lazy",
            src: icon.src,
            alt: icon.alt,
            width: 24,
            height: 24,
            className: chunkNSB5KGE4_cjs.cn("size-6", classNames?.flagIcon)
          }
        )
      },
      idx
    );
  }) });
}

module.exports = LanguageSwitcher;
//# sourceMappingURL=language-switcher.client-V5FJVNYG.cjs.map
//# sourceMappingURL=language-switcher.client-V5FJVNYG.cjs.map