'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

var _command = require('@reggi/command');

var _command2 = _interopRequireDefault(_command);

require('@reggi/dep-merge-cli');

require('@reggi/pkg-cli');

require('@reggi/pkgprop-cli');

require('@reggi/requireable-cli');

require('@reggi/subrepo-cli');

require('replace-cli');

require('results-cli');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subCommands = {
  'replace': 'replace-cli',
  'results': 'results-cli',
  'requireable': '@reggi/requireable-cli',
  'pkg': '@reggi/pkg-cli',
  'subrepo': '@reggi/subrepo-cli',
  'pkgprop': '@reggi/pkgprop-cli',
  'dep-merge': '@reggi/dep-merge-cli'
};

var getDesign = function getDesign(argv) {
  var h = (0, _help2.default)().name('reggi').usage('[subcommand]').description('All of the cli utilities created by Thomas Reggi in one command');
  (0, _lodash.each)(subCommands, function (mod, cmd) {
    h.option(cmd, require(`${mod}/package.json`).description);
  });
  h.option('-h --help', 'shows this output', 'help');
  return h.parse(argv.slice(2));
};

exports.default = (0, _command2.default)(module, function (p) {
  var design = getDesign(p.argv);
  var command = design.flags._[0];
  var match = (0, _lodash.get)(subCommands, command, false);
  if (match) return require(match).default(p);
  p.stdout.write(design.help() + '\n');
  return p.exit(0);
});
