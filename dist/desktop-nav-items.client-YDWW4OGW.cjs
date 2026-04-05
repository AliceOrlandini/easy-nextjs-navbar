'use strict';

var chunkNSB5KGE4_cjs = require('./chunk-NSB5KGE4.cjs');
var Link = require('next/link');
var navigation = require('next/navigation');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

function NavItems({ items, classNames }) {
  const pathname = navigation.usePathname() ?? "/";
  const isActive = (href) => pathname === href;
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 flex min-w-0 list-none flex-nowrap items-center gap-x-6 p-0 text-shadow-md", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      className: chunkNSB5KGE4_cjs.cn(
        "my-auto min-w-0",
        isActive(item.href) ? chunkNSB5KGE4_cjs.cn("border-b-2 border-tertiary", classNames?.linkActive) : ""
      ),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Link__default.default,
        {
          "aria-label": item.ariaLabel,
          href: item.href,
          className: chunkNSB5KGE4_cjs.cn(
            "wrap-break-words inline-flex max-w-[18ch] min-w-0 items-center text-center text-sm font-medium leading-tight whitespace-normal transition-colors hover:opacity-80",
            isActive(item.href) ? "pointer-events-none" : "",
            classNames?.link
          ),
          children: item.title
        }
      )
    },
    idx
  )) });
}

exports.NavItems = NavItems;
//# sourceMappingURL=desktop-nav-items.client-YDWW4OGW.cjs.map
//# sourceMappingURL=desktop-nav-items.client-YDWW4OGW.cjs.map