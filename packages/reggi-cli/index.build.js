'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

var _replaceCli = require('replace-cli');

var _replaceCli2 = _interopRequireDefault(_replaceCli);

var _package = require('replace-cli/package.json');

var _package2 = _interopRequireDefault(_package);

var _requireableCli = require('@reggi/requireable-cli');

var _requireableCli2 = _interopRequireDefault(_requireableCli);

var _package3 = require('@reggi/requireable-cli/package.json');

var _package4 = _interopRequireDefault(_package3);

var _pkgCli = require('@reggi/pkg-cli');

var _pkgCli2 = _interopRequireDefault(_pkgCli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDesign = function getDesign(argv) {
  return (0, _help2.default)().name('reggi').usage('[subcommand]').description('All of the cli utilities created by Thomas Reggi in one command').option('replace', _package2.default.description || 'hi').option('requireable', _package4.default.description || 'hi').option('pkg', _pkgCli2.default.description || 'hi').option('--help', 'show this output', 'help').parse(argv.slice(2));
};

exports.default = (0, _command2.default)(module, function (p) {
  var design = getDesign(p.argv);
  var command = design.flags._[0];
  if (command === 'replace') return (0, _replaceCli2.default)(p);
  if (command === 'requireable') return (0, _requireableCli2.default)(p);
  if (command === 'pkg') return (0, _pkgCli2.default)(p);
  if (design.flags.help) return p.stdout.write(design.help() + '\n');
});
