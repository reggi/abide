'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _semverSort = require('semver-sort');

var _semverSort2 = _interopRequireDefault(_semverSort);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkgtag = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$direction = _ref2.direction,
        direction = _ref2$direction === undefined ? 'desc' : _ref2$direction;

    var workingDir, pkgPath, pkg, _ref3, stdout, tags, pattern, releventTags;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            workingDir = process.cwd();
            pkgPath = _path2.default.join(workingDir, './package.json');
            _context.next = 4;
            return _fsExtra2.default.readJson(pkgPath);

          case 4:
            pkg = _context.sent;
            _context.next = 7;
            return _execa2.default.shell('git tag');

          case 7:
            _ref3 = _context.sent;
            stdout = _ref3.stdout;
            tags = stdout.split('\n');
            pattern = new RegExp(`^${pkg.name}@`);
            releventTags = (0, _lodash.chain)(tags).filter(function (tag) {
              return tag.match(pattern);
            }).map(function (tag) {
              return tag.replace(pattern, '');
            }).thru(_semverSort2.default[direction]).value();

            if (!(0, _lodash.includes)(releventTags, _semver2.default.inc(pkg.version, 'patch'))) {
              _context.next = 14;
              break;
            }

            throw new Error(`prospective next version tag exists already for ${pkg.name}`);

          case 14:
            return _context.abrupt('return', releventTags);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function pkgtag() {
    return _ref.apply(this, arguments);
  };
}();

pkgtag().then(console.log).catch(console.log);
