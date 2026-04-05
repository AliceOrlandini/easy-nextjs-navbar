import { useState, useEffect } from 'react';

// src/hooks/use-scroll-threshold.ts
function useScrollThreshold(thresholdInput = 0) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
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

export { useScrollThreshold };
//# sourceMappingURL=chunk-Q45LC5O3.js.map
//# sourceMappingURL=chunk-Q45LC5O3.js.map