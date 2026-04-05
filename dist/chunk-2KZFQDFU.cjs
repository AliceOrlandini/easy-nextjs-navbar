'use strict';

var react = require('react');

// src/hooks/use-scroll-threshold.ts
function useScrollThreshold(thresholdInput = 0) {
  const [scrolled, setScrolled] = react.useState(false);
  react.useEffect(() => {
    let ticking = false;
    const getThreshold = () => {
      if (typeof thresholdInput === "string" && thresholdInput.includes("vh")) {
        return window.innerHeight * parseFloat(thresholdInput) / 100;
      }
      return typeof thresholdInput === "string" ? parseFloat(thresholdInput) : thresholdInput;
    };
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const threshold = getThreshold();
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thresholdInput]);
  return scrolled;
}

exports.useScrollThreshold = useScrollThreshold;
//# sourceMappingURL=chunk-2KZFQDFU.cjs.map
//# sourceMappingURL=chunk-2KZFQDFU.cjs.map