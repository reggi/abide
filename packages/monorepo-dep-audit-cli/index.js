#!/usr/bin/env node
import {lernaDepAudit} from '@reggi/lerna.utils'
import help from '@reggi/help'
import command from '@reggi/command'
import debug from 'debug'
import pkg from './package.json'

const d = debug('monorepo-dep-audit')

const getDesign = (argv) => help()
  .name('monorepo-dep-audit')
  .description(pkg.description)
  .option('--showFix, -f', 'shows possible fixes', 'showFix')
  .option('--silent, -s', 'silent output', 'silent')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .parse(argv.slice(2))

export default command(module, async ({argv, stdout, stderr, cwd, exit}) => {
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
    const results = await lernaDepAudit({workingDir: cwd()})
    if (!results.length) return exit(0)
    if (!design.flags.silent) {
      results.forEach(e => {
        stderr.write(`${e.message}\n`)
        if (design.flags.showFix) stderr.write(`\t ${e.fix}\n`)
      })
    }
    return exit(1)
  }
})
