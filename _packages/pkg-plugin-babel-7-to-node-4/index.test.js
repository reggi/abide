import pluginBabel from './index.js'

test('pluginBabel', () => {
  expect(() => {
    pluginBabel()
  }).toThrow()
})

test('pluginBabel: with main', () => {
  const result = pluginBabel({pkg: {'main': './index.build.js'}})
  expect(result).toEqual({
    'main': './index.build.js',
    'scripts': {
      'babel': 'babel ./index.js --out-file ./index.build.js',
      'babel:watch': 'npm run babel -- --watch'
    },
    'devDependencies': {
      '@babel/cli': '^7.0.0-beta.40',
      '@babel/core': '^7.0.0-beta.40',
      '@babel/preset-env': '^7.0.0-beta.40'
    },
    'babel': {
      'presets': [[
        '@babel/preset-env',
        {
          'targets': {
            'node': '4.0.0'
          },
          'shippedProposals': true
        }
      ]]
    }
  })
})

test('pluginBabel: with main', () => {
  const result = pluginBabel({pkg: {'main': './dist/index.js'}})
  expect(result).toEqual({
    'main': './dist/index.js',
    'scripts': {
      'babel': 'babel ./src --out-dir ./dist',
      'babel:watch': 'npm run babel -- --watch'
    },
    'devDependencies': {
      '@babel/cli': '^7.0.0-beta.40',
      '@babel/core': '^7.0.0-beta.40',
      '@babel/preset-env': '^7.0.0-beta.40'
    },
    'babel': {
      'presets': [[
        '@babel/preset-env',
        {
          'targets': {
            'node': '4.0.0'
          },
          'shippedProposals': true
        }
      ]]
    }
  })
})

test('pluginBabel: with bin', () => {
  const result = pluginBabel({pkg: {'bin': './lib/index.js'}})
  expect(result).toEqual({
    'bin': './lib/index.js',
    'scripts': {
      'babel': 'babel ./src --out-dir ./lib',
      'babel:watch': 'npm run babel -- --watch'
    },
    'devDependencies': {
      '@babel/cli': '^7.0.0-beta.40',
      '@babel/core': '^7.0.0-beta.40',
      '@babel/preset-env': '^7.0.0-beta.40'
    },
    'babel': {
      'presets': [[
        '@babel/preset-env',
        {
          'targets': {
            'node': '4.0.0'
          },
          'shippedProposals': true
        }
      ]]
    }
  })
})
