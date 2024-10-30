// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript
        '^.+\\.(js|jsx)$': 'babel-jest', // Transform JS and JSX using Babel
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Map `@/` to `src/`
    },
    transformIgnorePatterns: ['/node_modules/', '/node_modules/(?!@fortawesome)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Custom Jest setup file
};
