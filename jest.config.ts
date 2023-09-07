export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
    '^.+\\.(less|scss)$': '<rootDir>/src/test/__ mocks __/styleMock.js',
    '\\.css$': 'identity-obj-proxy',
  },
};
