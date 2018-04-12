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
      'babel-cli': '^6.26.0',
      'babel-plugin-transform-object-rest-spread': '^6.26.0',
      'babel-preset-env': '^1.6.1'
    },
    'babel': {
      'plugins': [
        'transform-object-rest-spread'
      ],
      'presets': [
        [
          'env',
          {
            'targets': {
              'node': '4'
            }
          }
        ]
      ]
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
      'babel-cli': '^6.26.0',
      'babel-plugin-transform-object-rest-spread': '^6.26.0',
      'babel-preset-env': '^1.6.1'
    },
    'babel': {
      'plugins': [
        'transform-object-rest-spread'
      ],
      'presets': [
        [
          'env',
          {
            'targets': {
              'node': '4'
            }
          }
        ]
      ]
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
      'babel-cli': '^6.26.0',
      'babel-plugin-transform-object-rest-spread': '^6.26.0',
      'babel-preset-env': '^1.6.1'
    },
    'babel': {
      'plugins': [
        'transform-object-rest-spread'
      ],
      'presets': [
        [
          'env',
          {
            'targets': {
              'node': '4'
            }
          }
        ]
      ]
    }
  })
})
