import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './contents/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

export default config
