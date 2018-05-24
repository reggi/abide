#!/usr/bin/env node
import debug from 'debug'
import command from '@reggi/command'
import help from '@reggi/help'
import depPointer from '@reggi/dep-pointer'

const d = debug('dep-pointer-cli')

const getDesign = (argv) => help()
  .name('dep-pointer')
  .description('Tool for assigning version from file references')
  .option('--all', 'modify all packages dependency pointers', 'all')
  .option('--changed', 'modify all changed packages dependency pointers', 'changed')
  .option('--package <name>', 'specify package to modify dependency pointers', 'package')
  .option('--local', 'swaps backup for package.json', 'local')
  .option('--backup', 'backsup package.json', 'backup')
  .option('--savePrefix <string>', 'string prefix for version', 'savePrefix')
  .option('--help, -h', 'generate this output', 'help')
  .option('--version, -v', 'show version number', 'version')
  .option('--silent, -s', 'log no output', 'silent')
  .parse(argv.slice(2))

export default command(module, async ({argv, stdout, exit, cwd}) => {
  d('command started')
  const design = getDesign(argv)
  d('design fetched')
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
    const all = design.flags.all
    const changed = design.flags.changed
    const packageName = design.flags.package
    const useLocal = design.flags.local
    const backupLocal = design.flags.backup
    const workingDir = cwd()
    const savePrefix = design.flags.savePrefix || ''
    await depPointer({workingDir, savePrefix, all, changed, packageName, backupLocal, useLocal})
    return exit(0)
  }
})
