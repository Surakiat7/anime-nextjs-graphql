import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    nextui({
      themes: {
        'purple-dark': {
          extend: 'dark',
          colors: {
            background: '#020617',
            foreground: '#ffffff',
            primary: {
              50: '#660030',
              100: '#80003C',
              200: '#A6004C',
              300: '#CC005D',
              400: '#E00067',
              500: '#FF005E',
              600: '#FF337B',
              700: '#FF6698',
              800: '#FF99B5',
              900: '#FFCCD2',
              DEFAULT: '#FF005E',
              foreground: '#ffffff',
            },
            focus: '#FF337B',
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};

export default config;
