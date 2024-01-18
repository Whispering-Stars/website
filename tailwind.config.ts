import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'baloo': ["'Baloo Thambi 2'", 'system-ui'],
    },
    extend: {
      colors: {
        'mariner': '#2176cc',
        'salmon': '#ff7d6e',
        'flamingo-pink': '#fca6ac',
        'white-rock': '#e8e7cb',
      },
      height: {
        '128': '32rem',
        '144': '36rem',
      },
      maxHeight: {
        '128': '32rem',
      },
      minHeight: {
        '4/5': '80%',
      },
      boxShadow: {
        'ws-sm': '2.5px 2.5px 0px 0px  #2176cc',
        'ws-default': '5px 5px 0px 0px  #2176cc'
      },
    },
  },
  plugins: [],
} satisfies Config

