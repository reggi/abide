'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pkg = _ref.pkg,
      opt = _ref.opt;

  if (!opt.prefix) throw new Error('missing prefix');
  if (!opt.type) throw new Error('missing type');
  var splitPackage = pkg.name.split('/');
  var repoName = splitPackage[1] || splitPackage[0];
  var url = `${opt.prefix}${repoName}`;
  return (0, _extends3.default)({}, pkg, {
    repository: {
      type: opt.type,
      url
    }
  });
};
