import { cn } from './chunk-4QY7C7TB.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { jsx } from 'react/jsx-runtime';

function NavItems({ items, classNames }) {
  const pathname = usePathname() ?? "/";
  const isActive = (href) => pathname === href;
  return /* @__PURE__ */ jsx("ul", { className: "m-0 flex min-w-0 list-none flex-nowrap items-center gap-x-6 p-0 text-shadow-md", children: items.map((item, idx) => /* @__PURE__ */ jsx(
    "li",
    {
      className: cn(
        "my-auto min-w-0",
        isActive(item.href) ? cn("border-b-2 border-tertiary", classNames?.linkActive) : ""
      ),
      children: /* @__PURE__ */ jsx(
        Link,
        {
          "aria-label": item.ariaLabel,
          href: item.href,
          className: cn(
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

export { NavItems };
//# sourceMappingURL=desktop-nav-items.client-7EW5HXXB.js.map
//# sourceMappingURL=desktop-nav-items.client-7EW5HXXB.js.map