'use client';
import { useScrollThreshold } from '@/hooks/use-scroll-threshold';

export default function StickyReveal({
  threshold = '100vh',
  children
}: {
  threshold?: string | number;
  children: React.ReactNode;
}) {
  const show = useScrollThreshold(threshold);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out will-change-transform ${
        show
          ? 'translate-y-0 opacity-100 shadow-md'
          : 'pointer-events-none -translate-y-[120%] opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
