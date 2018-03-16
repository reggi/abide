const changes = {
  'devDependencies': {
    '@babel/cli': '^7.0.0-beta.40',
    '@babel/core': '^7.0.0-beta.40',
    '@babel/preset-env': '^7.0.0-beta.40'
  },
  'babel': {
    'presets': [
      [
        '@babel/preset-env',
        {
          'targets': {
            'node': '4.0.0'
          },
          'shippedProposals': true
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
