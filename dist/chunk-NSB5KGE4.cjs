'use strict';

var tailwindMerge = require('tailwind-merge');

// src/lib/cn.ts
function cn(...classes) {
  return tailwindMerge.twMerge(classes.filter(Boolean).join(" "));
}

exports.cn = cn;
//# sourceMappingURL=chunk-NSB5KGE4.cjs.map
//# sourceMappingURL=chunk-NSB5KGE4.cjs.map