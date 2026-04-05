import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS preset for @aliceorlandini/my-navbar.
 *
 * Add to your tailwind.config.ts:
 *
 *   import navbarPreset from 'easy-nextjs-navbar/tailwind-preset';
 *
 *   export default {
 *     presets: [navbarPreset],
 *     content: [
 *       // your content paths...
 *       './node_modules/easy-nextjs-navbar/dist/**\/*.{js,mjs}',
 *     ],
 *   } satisfies Config;
 *
 * Colors are exposed as CSS custom properties so you can override them
 * in your global CSS without touching this preset:
 *
 *   :root {
 *     --navbar-dark-green: #1a3c2a;
 *     --navbar-tertiary: #f5f0e8;
 *   }
 */
const navbarPreset = {
  theme: {
    extend: {
      screens: {
        'very-small-smartphone': '320px',
        'small-smartphone': '375px',
        'large-smartphone': '425px',
        tablet: '640px',
        'tablet-landscape': '768px',
        desktop: '1024px',
      },
      colors: {
        'dark-green': 'var(--navbar-dark-green, #1a3c2a)',
        tertiary: 'var(--navbar-tertiary, #f5f0e8)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      textShadow: {
        md: '0 1px 3px rgba(0, 0, 0, 0.4)',
      },
    },
  },
} satisfies Partial<Config>;

export default navbarPreset;
