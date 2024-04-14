module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@utils/(.*)$': '<rootDir>/src/app/shared/utils/$1',
    '^@store/(.*)$': '<rootDir>/src/app/store/$1',
  },
}
