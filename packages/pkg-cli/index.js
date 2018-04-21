#!/usr/bin/env node
import pkg from '@reggi/pkg'
import help from '@reggi/help'
import command from '@reggi/command'
import debug from 'debug'

const d = debug('pkg-cli')

const getDesign = (argv) => help()
  .name('pkg')
  .description('Generate a package.json based on plugins')
  .option('--write, -w', 'writes output to package.json file', 'write')
  .option('--output, -o', 'writes output to stdout', 'output')
  .option('--plugin <module>', 'path to pkg plugin', 'plugin')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .option('--dir, -C <path>', 'path to use as working directory', 'workingDir')
  .option('--silent, -s', 'silent the command', 'silent')
  .parse(argv.slice(2))

export default command(module, async ({argv, stdout, cwd, exit}) => {
  const design = getDesign(argv)
  if (design.flags.help) {
    d('help hit')
    stdout.write(design.help() + '\n')
    return exit(0)
  } else if (design.flags.version) {
    d('version hit')
    const pkg = require('./package.json')
    stdout.write(pkg.version + '\n')
    return exit(0)
  } else {
    const workingDir = design.flags.workingDir || cwd()
    const plugin = design.flags.plugin
    const output = design.flags.output
    const write = design.flags.write
    try {
      await pkg({workingDir, plugin, write, stdout: output, argv})
      return exit(0)
    } catch (e) {
      stdout.write(e.message + '\n')
      return exit(1)
    }
  }
})
