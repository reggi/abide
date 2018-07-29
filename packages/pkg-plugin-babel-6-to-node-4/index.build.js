'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _pkg = require('@reggi/pkg.prop-overwrite');

var _pkg2 = _interopRequireDefault(_pkg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  var babelScriptBasedOnBin = pkg.bin && typeof pkg.bin === 'string' && basedOnFile[pkg.bin] ? basedOnFile[pkg.bin] : false;
  var babelScriptBasedOnMain = pkg.main && basedOnFile[pkg.main] ? basedOnFile[pkg.main] : false;
  var babel = babelScriptBasedOnMain || babelScriptBasedOnBin;
  if (!babel) throw new Error('pkg-plugin-babel no main or bin found ');
  return _extends({}, pkg, {
    scripts: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'scripts', {}), {
      'babel': babel,
      'babel:watch': 'npm run babel -- --watch'
    }),
    devDependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'devDependencies', {}), {
      'babel-cli': '^6.26.0',
      'babel-plugin-transform-object-rest-spread': '^6.26.0',
      'babel-plugin-transform-runtime': '^6.23.0',
      'babel-preset-env': '^1.6.1'
    }),
    dependencies: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'dependencies', {}), {
      'babel-runtime': '^6.26.0'
    }),
    babel: (0, _pkg2.default)(overwrite, (0, _lodash.get)(pkg, 'babel', {}), {
      'plugins': [].concat(_toConsumableArray((0, _lodash.get)(pkg, 'plugins', [])), ['transform-object-rest-spread', 'transform-runtime']),
      'presets': [].concat(_toConsumableArray((0, _lodash.get)(pkg, 'presets', [])), [['env', {
        'targets': {
          'node': '4'
        }
      }]])
    })
  });
};
