#!/usr/bin/env node
import pkg from '@reggi/pkg'
import help from '@reggi/help'

const design = help()
  .name('pkg')
  .description('Generate a package.json based on plugins')
  .option('--write, -w', 'writes output to package.json file', 'write')
  .option('--output, -o', 'writes output to stdout', 'output')
  .option('--plugin <module>', 'path to pkg plugin', 'plugin')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .option('--dir, -C <path>', 'path to use as working directory', 'workingDir')
  .parse(process.argv.slice(2))

const workingDir = design.flags.workingDir || process.cwd()
const plugin = design.flags.plugin
const output = design.flags.output
const write = design.flags.write
const stdout = !(write && !output)
const argv = process.argv.slice(2)
const version = design.flags.version
const needsHelp = design.flags.help

if (needsHelp) {
  process.stdout.write(design.help() + '\n')
  process.exit(0)
} else if (version) {
  const pkg = require('./package.json')
  process.stdout.write(pkg.version + '\n')
  process.exit(0)
} else {
  pkg({workingDir, plugin, write, stdout, argv})
    .then(() => {
      process.exit(0)
    })
    .catch(e => {
      process.stderr.write(e.message + '\n')
      process.exit(1)
    })
}
