'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      wd = _ref.wd,
      opt = _ref.opt;

  if (!pkg.name) throw new Error('missing name');
  var ogName = pkg.name;
  var splitName = ogName.split('/');
  var name = splitName.length >= 2 ? splitName[1] : ogName;
  return (0, _extends3.default)({}, pkg, {
    name: `${opt}/${name}`
  });
};
