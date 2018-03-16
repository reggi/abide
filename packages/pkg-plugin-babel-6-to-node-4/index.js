const changes = {
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
}

const basedOnFile = {
  './index.build.js': 'babel ./index.js --out-file ./index.build.js',
  './lib/index.js': 'babel ./src --out-dir ./lib',
  './dist/index.js': 'babel ./src --out-dir ./dist'
}

module.exports = ({pkg}) => {
  // allows for bin or main, and will add `babel` script based on it
  const babelScriptbasedOnBin = (pkg.bin && typeof pkg.bin === 'string' && basedOnFile[pkg.bin]) ? basedOnFile[pkg.bin] : {}
  const babelScriptBasedOnMain = (pkg.main && basedOnFile[pkg.main]) ? basedOnFile[pkg.main] : {}
  return {
    ...changes,
    ...pkg,
    scripts: {
      ...pkg.scripts,
      'babel': babelScriptBasedOnMain || babelScriptbasedOnBin
    },
    devDependencies: {
      ...pkg.devDependencies,
      ...changes.devDependencies
    }
  }
}
