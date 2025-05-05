import type { Config } from '@jest/types'

import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-fixed-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}

export default createJestConfig(config)
