import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

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
