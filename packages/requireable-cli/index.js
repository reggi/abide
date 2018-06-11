#!/usr/bin/env node
import requireable from '@reggi/requireable'
import command from '@reggi/command'
import help from '@reggi/help'
import {get, flattenDeep} from 'lodash'

const getDesign = (argv) => help()
  .name('requireable')
  .usage('[flags] [modulePath]')
  .description('Check and see if a module is requireable in node')
  .option('--module <path>', 'path to the local module', 'module')
  .option('--node <path>', 'path to the node binary', 'nodeBin')
  .option('--npmClient <path>', 'path to the npm client', 'npmClient')
  .option('--verbose', 'show debug content', 'verbose')
  .option('--inherit, -i', 'show debug content', 'inherit')
  .option('--help, -h', 'generate this output', 'help')
  .option('--version, -v', 'show version number', 'version')
  .option('--silent, -s', 'no output', 'silent')
  .parse(argv.slice(2))

const main = async ({argv}) => {
  const design = getDesign(argv)
  if (design.flags.verbose) process.env['DEBUG'] = 'requireable-cli,requireable:*'
  const modPath = design.flags.module || get(flattenDeep(design.flags._), '0') || false
  if (design.flags.help) {
    return design.help()
  } else if (design.flags.version) {
    return require('./package.json').version
  } else if (modPath) {
    const {nodeBin, npmClient, inherit} = design.flags
    await requireable({modPath, nodeBin, npmClient, inherit})
    return false
  } else {
    throw new Error('invalid argument')
  }
}

export default command(module, async ({argv, exit, stdout}) => {
  try {
    const message = await main({argv})
    if (message) stdout.write(message + '\n')
    return exit(0)
  } catch (e) {
    stdout.write(e.message + '\n')
    return exit(1)
  }
})
