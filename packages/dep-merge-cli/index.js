#!/usr/bin/env node
import debug from 'debug'
import help from '@reggi/help'
import {depMerge, unDepMerge} from '@reggi/dep-merge'
import command from '@reggi/command'

const d = debug('dep-merge-cli')

const getDesign = (argv) => help()
  .name('dep-merge')
  .description('Tool for merging devDependencies into dependencies')
  .option('--merge', 'merges devDependencies into dependencies', 'merge')
  .option('--unmerge', 'unmerges devDependencies from dependencies', 'unmerge')
  .option('--path, -C <path>', 'path to node module directory', 'path')
  .option('--help, -h', 'generate this output', 'help')
  .option('--version, -v', 'show version number', 'version')
  .option('--silent, -s', 'log no output', 'silent')
  .parse(argv.slice(2))

export default command(module, async ({argv, stdout, exit}) => {
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
  } else if ((design.flags.merge || design.flags.unmerge) && !design.flags.path) {
    d('missing path hit')
    stdout.write('missing path')
    return exit(1)
  } else if (design.flags.merge) {
    try {
      d('merge attempting')
      await depMerge(design.flags.path)
      d('merge success')
      if (!design.flags.silent) stdout.write('dep-merge: done merging\n')
      return exit(0)
    } catch (e) {
      d('merge error')
      stdout.write(e.message)
      return exit(1)
    }
  } else if (design.flags.unmerge) {
    try {
      d('unmerge attempting')
      await unDepMerge(design.flags.path)
      d('unmerge success')
      if (!design.flags.silent) stdout.write('dep-merge: done unmerging\n')
      return exit(0)
    } catch (e) {
      d('unmerge error')
      stdout.write(e.message)
      return exit(1)
    }
  } else {
    d('else case')
    if (!design.flags.silent) stdout.write('invalid arguments')
    return exit(1)
  }
})
