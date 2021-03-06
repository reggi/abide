'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subrepo = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isGitUrl = require('is-git-url');

var _isGitUrl2 = _interopRequireDefault(_isGitUrl);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subrepo = exports.subrepo = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var source = _ref.source,
        workingDir = _ref.workingDir,
        subrepoPath = _ref.subrepoPath,
        destDir = _ref.destDir,
        _ref$stdio = _ref.stdio,
        stdio = _ref$stdio === undefined ? 'pipe' : _ref$stdio;
    var tmpDir, id, fullDestDir, fullSource, baseDir, sourceDir, subrepoDir, error, workingDirExists;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tmpDir = _os2.default.tmpdir();
            id = (0, _v2.default)();
            fullDestDir = _path2.default.join(workingDir, destDir);
            fullSource = (0, _isGitUrl2.default)(source) || _path2.default.isAbsolute(source) ? source : _path2.default.join(workingDir, source);
            baseDir = _path2.default.join(tmpDir, 'subrepo-cli', id);
            sourceDir = _path2.default.join(baseDir, 'source');
            subrepoDir = _path2.default.join(baseDir, 'subrepo');
            error = void 0;
            _context.prev = 8;
            _context.next = 11;
            return _fsExtra2.default.pathExists(workingDir);

          case 11:
            workingDirExists = _context.sent;

            if (workingDirExists) {
              _context.next = 14;
              break;
            }

            throw new Error(`provided working directory does not exist ${workingDir}`);

          case 14:
            _context.next = 16;
            return _bluebird2.default.props({
              mkSourceDir: _fsExtra2.default.mkdirp(sourceDir),
              mkSubrepoDir: _fsExtra2.default.mkdirp(subrepoDir)
            });

          case 16:
            _context.next = 18;
            return _execa2.default.shell(`git clone ${fullSource} ${sourceDir}`, { cwd: baseDir, stdio });

          case 18:
            _context.next = 20;
            return _execa2.default.shell(`git remote remove origin`, { cwd: sourceDir, stdio });

          case 20:
            _context.next = 22;
            return _execa2.default.shell(`git filter-branch --subdirectory-filter ${subrepoPath}`, { cwd: sourceDir, stdio });

          case 22:
            _context.next = 24;
            return _execa2.default.shell(`git init`, { cwd: subrepoDir, stdio });

          case 24:
            _context.next = 26;
            return _execa2.default.shell(`git remote add source ${sourceDir}`, { cwd: subrepoDir, stdio });

          case 26:
            _context.next = 28;
            return _execa2.default.shell(`git fetch source`, { cwd: subrepoDir, stdio });

          case 28:
            _context.next = 30;
            return _execa2.default.shell(`git merge source/master`, { cwd: subrepoDir, stdio });

          case 30:
            _context.next = 32;
            return _fsExtra2.default.move(subrepoDir, fullDestDir);

          case 32:
            _context.next = 37;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context['catch'](8);

            error = _context.t0;

          case 37:
            _context.next = 39;
            return _fsExtra2.default.remove(baseDir);

          case 39:
            if (!error) {
              _context.next = 41;
              break;
            }

            throw error;

          case 41:
            return _context.abrupt('return', true);

          case 42:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 34]]);
  }));

  return function subrepo(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = subrepo;
