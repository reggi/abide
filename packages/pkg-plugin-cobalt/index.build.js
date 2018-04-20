'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pkgPluginProp = require('@reggi/pkg-plugin-prop');

var _pkgPluginProp2 = _interopRequireDefault(_pkgPluginProp);

var _pkgPluginNameScope = require('@reggi/pkg-plugin-name-scope');

var _pkgPluginNameScope2 = _interopRequireDefault(_pkgPluginNameScope);

var _pkgPluginNameDir = require('@reggi/pkg-plugin-name-dir');

var _pkgPluginNameDir2 = _interopRequireDefault(_pkgPluginNameDir);

var _pkgPluginBabel6ToNode = require('@reggi/pkg-plugin-babel-6-to-node-4');

var _pkgPluginBabel6ToNode2 = _interopRequireDefault(_pkgPluginBabel6ToNode);

var _pkgPluginJest = require('@reggi/pkg-plugin-jest');

var _pkgPluginJest2 = _interopRequireDefault(_pkgPluginJest);

var _pkgPluginStandard = require('@reggi/pkg-plugin-standard');

var _pkgPluginStandard2 = _interopRequireDefault(_pkgPluginStandard);

var _pkgPluginSort = require('@reggi/pkg-plugin-sort');

var _pkgPluginSort2 = _interopRequireDefault(_pkgPluginSort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [[_pkgPluginProp2.default, {
  'author': 'Thomas Reggi',
  'main': './index.build.js',
  'version': '0.0.1',
  'publishConfig': {
    'access': 'public'
  }
}], _pkgPluginNameDir2.default, [_pkgPluginNameScope2.default, '@reggi'], _pkgPluginBabel6ToNode2.default, [_pkgPluginJest2.default, { 'addBabelJest': true, 'hunderedPercent': true }], [_pkgPluginStandard2.default, { 'jest': true, 'babel': true, 'ignore': '*.build.js' }], [_pkgPluginProp2.default, { 'scripts.test': 'npm run standard && npm run jest' }], [_pkgPluginProp2.default, { 'scripts.build': 'npm run babel' }], _pkgPluginSort2.default];
