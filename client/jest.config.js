const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  reporters: ['default', 'jest-junit'],
  moduleNameMapper: {
	'uuid': require.resolve('uuid')
  }
};

module.exports = createJestConfig(customJestConfig);
