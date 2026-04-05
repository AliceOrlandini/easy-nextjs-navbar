import { useScrollThreshold } from './chunk-Q45LC5O3.js';
import { cn } from './chunk-4QY7C7TB.js';
import { jsx } from 'react/jsx-runtime';

function StickyReveal({
  threshold = "100vh",
  className,
  children
}) {
  const show = useScrollThreshold(threshold);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out will-change-transform",
        show ? "translate-y-0 opacity-100 shadow-md" : "pointer-events-none -translate-y-[120%] opacity-0",
        className
      ),
      children
    }
  );
}

export { StickyReveal as default };
//# sourceMappingURL=sticky-reveal.client-3QAD45GF.js.map
//# sourceMappingURL=sticky-reveal.client-3QAD45GF.js.map