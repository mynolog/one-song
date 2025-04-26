import type { Config } from '@jest/types'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)
