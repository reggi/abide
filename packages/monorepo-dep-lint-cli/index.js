#!/usr/bin/env node
import {lernaDepAudit} from '@reggi/lerna.utils'
import help from '@reggi/help'
import commandPlus from '@reggi/command-plus'
import pkg from './package.json'

const getDesign = (argv) => help()
  .name('monorepo-dep-lint')
  .description(pkg.description)
  .option('--showFix, -f', 'shows possible fixes', 'showFix')
  .option('--silent, -s', 'silent output', 'silent')
  .option('--version, -v', 'shows the version', 'version')
  .option('--help, -h', 'shows this usage output', 'help')
  .parse(argv.slice(2))

const output = ({errors, showFix}) => {
  const output = []
  errors.forEach(e => {
    output.push(`${e.message}`)
    if (showFix) output.push(`\t${e.fix}`)
  })
  return output.join('\n')
}

export default commandPlus(module, async ({argv, cwd}) => {
  const design = getDesign(argv)
  const workingDir = cwd()
  const silent = design.flags.silent
  const showFix = design.flags.showFix
  if (design.flags.help) return design.help()
  if (design.flags.version) return pkg.version
  const errors = await lernaDepAudit({workingDir})
  if (!errors.length) return true
  if (silent) return false
  throw new Error(output({errors, showFix}))
})
