import {get} from 'lodash'
import propOverwrite from '@reggi/pkg.prop-overwrite'

export default ({pkg = {}, overwrite = false, opt = {}} = {}) => {
  const basedOnFile = {
    './index.build.js': 'babel ./index.js --out-file ./index.build.js',
    './lib/index.js': 'babel ./src --out-dir ./lib',
    './dist/index.js': 'babel ./src --out-dir ./dist'
  }
  const babelScriptbasedOnBin = (pkg.bin && typeof pkg.bin === 'string' && basedOnFile[pkg.bin]) ? basedOnFile[pkg.bin] : false
  const babelScriptBasedOnMain = (pkg.main && basedOnFile[pkg.main]) ? basedOnFile[pkg.main] : false
  const babel = babelScriptBasedOnMain || babelScriptbasedOnBin
  if (!babel) throw new Error('pkg-plugin-babel no main or bin found ')
  return {
    ...pkg,
    scripts: propOverwrite(overwrite, get(pkg, 'scripts', {}), {
      'babel': babel,
      'babel:watch': 'npm run babel -- --watch'
    }),
    devDependencies: propOverwrite(overwrite, get(pkg, 'devDependencies', {}), {
      'babel-cli': '^6.26.0',
      'babel-plugin-transform-object-rest-spread': '^6.26.0',
      'babel-preset-env': '^1.6.1'
    }),
    babel: propOverwrite(overwrite, get(pkg, 'babel', {}), {
      'plugins': [
        ...get(pkg, 'plugins', []),
        'transform-object-rest-spread'
      ],
      'presets': [
        ...get(pkg, 'presets', []),
        [
          'env',
          {
            'targets': {
              'node': '4'
            }
          }
        ]
      ]
    })
  }
}
