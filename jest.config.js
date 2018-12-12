module.exports = {
  verbose: true,
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest'
  },
  testMatch: [
    '<rootDir>/(tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupTestFrameworkScriptFile: '<rootDir>/tests/setupTests.js'
};
