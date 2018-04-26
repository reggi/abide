import help from '@reggi/help'
import command from '@reggi/command'
import replaceCli from 'replace-cli'
import replaceCliPackage from 'replace-cli/package.json'
import requireableCli from '@reggi/requireable-cli'
import requireableCliPackage from '@reggi/requireable-cli/package.json'
import pkgCli from '@reggi/pkg-cli'
import pkgCliPackage from '@reggi/pkg-cli'

const getDesign = (argv) => help()
  .name('reggi')
  .usage('[subcommand]')
  .description('All of the cli utilities created by Thomas Reggi in one command')
  .option('replace', replaceCliPackage.description || 'hi')
  .option('requireable', requireableCliPackage.description || 'hi')
  .option('pkg', pkgCliPackage.description || 'hi')
  .option('--help', 'show this output', 'help')
  .parse(argv.slice(2))

export default command(module, (p) => {
  const design = getDesign(p.argv)
  const command = design.flags._[0]
  if (command === 'replace') return replaceCli(p)
  if (command === 'requireable') return requireableCli(p)
  if (command === 'pkg') return pkgCli(p)
  if (design.flags.help) return p.stdout.write(design.help() + '\n')
})
