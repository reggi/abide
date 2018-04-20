#!/usr/bin/env node
'use strict';

var _pkg2 = require('@reggi/pkg');

var _pkg3 = _interopRequireDefault(_pkg2);

var _help = require('@reggi/help');

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var design = (0, _help2.default)().name('pkg').description('Generate a package.json based on plugins').option('--write, -w', 'writes output to package.json file', 'write').option('--output, -o', 'writes output to stdout', 'output').option('--plugin <module>', 'path to pkg plugin', 'plugin').option('--version, -v', 'shows the version', 'version').option('--help, -h', 'shows this usage output', 'help').option('--dir, -C <path>', 'path to use as working directory', 'workingDir').parse(process.argv.slice(2));

console.log(design.flags);

var workingDir = design.flags.workingDir || process.cwd();
var plugin = design.flags.plugin;
var output = design.flags.output;
var write = design.flags.write;
var stdout = !(write && !output);
var argv = process.argv.slice(2);
var version = design.flags.version;
var needsHelp = design.flags.help;

if (needsHelp) {
  process.stdout.write(design.help() + '\n');
  process.exit(0);
} else if (version) {
  var _pkg = require('./package.json');
  process.stdout.write(_pkg.version + '\n');
  process.exit(0);
} else {
  (0, _pkg3.default)({ workingDir, plugin, write, stdout, argv }).then(function () {
    process.exit(0);
  }).catch(function (e) {
    process.stderr.write(e.message + '\n');
    process.exit(1);
  });
}
