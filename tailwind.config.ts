import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        'purple-dark': {
          extend: 'dark',
          colors: {
            background: '#020617',
            foreground: '#ffffff',
            primary: {
              50: '#E0F9FB',
              100: '#B3F0F6',
              200: '#80E5F0',
              300: '#4DDCEB',
              400: '#26D5E7',
              500: '#47E0E6',
              600: '#1BCAD4',
              700: '#009AB0',
              800: '#007889',
              900: '#00464E',
              DEFAULT: '#47E0E6',
              foreground: '#ffffff',
            },
            focus: '#4DDCEB',
          },
        },
      },
    }),
  ],
};

export default config;
