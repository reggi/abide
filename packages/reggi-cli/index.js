#!/usr/bin/env node
import {get, each} from 'lodash'
import help from '@reggi/help'
import command from '@reggi/command'
import '@reggi/dep-merge-cli'
import '@reggi/pkg-cli'
import '@reggi/pkgprop-cli'
import '@reggi/requireable-cli'
import '@reggi/subrepo-cli'
import '@reggi/dep-pointer-cli'
import 'replace-cli'
import 'results-cli'

const subCommands = {
  'replace': 'replace-cli',
  'results': 'results-cli',
  'requireable': '@reggi/requireable-cli',
  'pkg': '@reggi/pkg-cli',
  'subrepo': '@reggi/subrepo-cli',
  'pkgprop': '@reggi/pkgprop-cli',
  'dep-merge': '@reggi/dep-merge-cli',
  'dep-pointer': '@reggi/dep-pointer-cli'
}

const getDesign = (argv) => {
  const h = help()
    .name('reggi')
    .usage('[subcommand]')
    .description('All of the cli utilities created by Thomas Reggi in one command')
  each(subCommands, (mod, cmd) => {
    h.option(cmd, require(`${mod}/package.json`).description)
  })
  h.option('-h --help', 'shows this output', 'help')
  return h.parse(argv.slice(2))
}

export default command(module, (p) => {
  const design = getDesign(p.argv)
  const command = design.flags._[0]
  const match = get(subCommands, command, false)
  if (match) return require(match).default(p)
  p.stdout.write(design.help() + '\n')
  return p.exit(0)
})
