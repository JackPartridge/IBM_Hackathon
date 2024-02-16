/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },

  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#ece3ca',
          'secondary': '#218380',
          'info': '#ca8a04',
          'success': '#178D43',
          // DMC3756
          'warning': '#E9E6DD',
          'error': '#D4AA3A',
          'bg-base-100': '#D4AA3A',
          'bg-base-200': '#E9E6DD',
        },
      },
    ],
  }
}
