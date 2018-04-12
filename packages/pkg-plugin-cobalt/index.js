import prop from '@reggi/pkg-plugin-prop'
import nameScope from '@reggi/pkg-plugin-name-scope'
import nameDir from '@reggi/pkg-plugin-name-dir'
import babel from '@reggi/pkg-plugin-babel-6-to-node-4'
import jest from '@reggi/pkg-plugin-jest'
import standard from '@reggi/pkg-plugin-standard'
import sort from '@reggi/pkg-plugin-sort'

export default [
  [prop, {
    'author': 'Thomas Reggi',
    'main': './index.build.js',
    'version': '1.0.0',
    'publishConfig': {
      'access': 'public'
    }
  }],
  nameDir,
  [nameScope, '@reggi'],
  babel,
  [jest, {'addBabelJest': true, 'hunderedPercent': true}],
  [standard, {'jest': true}],
  sort
]
