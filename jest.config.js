module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Or 'jsdom' if you need a browser-like environment
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
};

