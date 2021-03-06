'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _pkg = require('@reggi/pkg.prop-overwrite');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$pkg = _ref.pkg,
      pkg = _ref$pkg === undefined ? {} : _ref$pkg,
      _ref$overwrite = _ref.overwrite,
      overwrite = _ref$overwrite === undefined ? false : _ref$overwrite,
      _ref$opt = _ref.opt,
      opt = _ref$opt === undefined ? {} : _ref$opt;

  var basedOnFile = {
    './index.build.js': 'babel ./index.js --out-file ./index.build.js',
    './lib/index.js': 'babel ./src --out-dir ./lib',
    './dist/index.js': 'babel ./src --out-dir ./dist'
  };
  var babelScriptbasedOnBin = pkg.bin && typeof pkg.bin === 'string' && basedOnFile[pkg.bin] ? basedOnFile[pkg.bin] : false;
  var babelScriptBasedOnMain = pkg.main && basedOnFile[pkg.main] ? basedOnFile[pkg.main] : false;
  var babel = babelScriptBasedOnMain || babelScriptbasedOnBin;
  if (!babel) throw new Error('pkg-plugin-babel no main or bin found ');
  return (0, _extends3.default)({}, pkg, {
    scripts: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'scripts', {}), {
      'babel': babel,
      'babel:watch': 'npm run babel -- --watch'
    }),
    devDependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'devDependencies', {}), {
      '@babel/cli': '^7.0.0-beta.40',
      '@babel/core': '^7.0.0-beta.40',
      '@babel/preset-env': '^7.0.0-beta.40'
    }),
    babel: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'babel', {}), {
      'presets': [].concat((0, _toConsumableArray3.default)((0, _lodash.get)(pkg, 'presets', [])), [['@babel/preset-env', {
        'targets': {
          'node': '4.0.0'
        },
        'shippedProposals': true
      }]])
    })
  });
};
