'use client';
'use strict';

var chunk2KZFQDFU_cjs = require('./chunk-2KZFQDFU.cjs');
var chunkNSB5KGE4_cjs = require('./chunk-NSB5KGE4.cjs');
var jsxRuntime = require('react/jsx-runtime');

function StickyReveal({
  threshold = "100vh",
  className,
  children
}) {
  const show = chunk2KZFQDFU_cjs.useScrollThreshold(threshold);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunkNSB5KGE4_cjs.cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out will-change-transform",
        show ? "translate-y-0 opacity-100 shadow-md" : "pointer-events-none -translate-y-[120%] opacity-0",
        className
      ),
      children
    }
  );
}

module.exports = StickyReveal;
//# sourceMappingURL=sticky-reveal.client-ANJUIOLU.cjs.map
//# sourceMappingURL=sticky-reveal.client-ANJUIOLU.cjs.map