import prop from '@reggi/pkg-plugin-prop'
import nameScope from '@reggi/pkg-plugin-name-scope'
import nameDir from '@reggi/pkg-plugin-name-dir'
import babel from '@reggi/pkg-plugin-babel-6-to-node-4'
import jest from '@reggi/pkg-plugin-jest'
import standard from '@reggi/pkg-plugin-standard'
import sort from '@reggi/pkg-plugin-sort'
import repo from '@reggi/pkg-plugin-repo'

export default [
  [prop, {
    'author': 'Thomas Reggi',
    'main': './index.build.js',
    'version': '0.0.1',
    'publishConfig': {
      'access': 'public'
    }
  }],
  nameDir,
  [nameScope, '@reggi'],
  babel,
  [jest, {'addBabelJest': true, 'hunderedPercent': true}],
  [standard, {'jest': true, 'babel': true, 'ignore': '*.build.js'}],
  [prop, {'scripts.test': 'npm run standard && npm run jest'}],
  [prop, {'scripts.build': 'npm run babel'}],
  [repo, {'type': 'git', 'prefix': 'https://github.com/reggi/'}],
  sort
]
