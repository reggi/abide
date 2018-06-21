module.exports = {
  'coverageReporters': [
    'html',
    'text'
  ],
  'collectCoverage': true,
  'coveragePathIgnorePatterns': [
    '<rootDir>/unpublished/.+',
    '<rootDir>/packages/.+/examples/.+',
    '.+build.js',
    '<rootDir>packages/pkg-plugin-prop/index.build.js'
  ],
  'modulePathIgnorePatterns': [
    '<rootDir>/unpublished/.+',
    '<rootDir>/packages/.+/examples/.+',
    '.+build.js'
  ],
  'testPathIgnorePatterns': [
    '<rootDir>/unpublished/.+',
    '<rootDir>/packages/.+/examples/.+',
    '.+build.js'
  ],
  'watchPathIgnorePatterns': [
    '<rootDir>/unpublished/.+',
    '<rootDir>/packages/.+/examples/.+',
    '.+build.js'
  ]
}
