

class Program {
  constructor () {
    this._options = []
  }
  usage (usage) {
    this._usage = usage
    return this
  }
  description (description) {
    this._description = description
    return this
  }
  option (_flags, description) {
    const flags = _
    flags.map(flag => {

    })
    this._options.push(option)
    return this
  }
  parse (argv) {
    
  }
}


// const help = hasFlag('h') || hasFlag('H') || hasFlag('help')
// const version = hasFlag('v') || hasFlag('V') || hasFlag('version')

const {help, values} = program
  .usage()

// program
//   .usage('[options] [-- <args>...]')
//   .description('print clear exit code from command')
//   .option('-n, --no-color', 'remove color')
//   .option('-i, --inherit', 'inherit stdin')
//   .option('-c, --command-show', 'prints command evaluted')
//   .option('-p, --path-show', 'prints current working path')
//   .option('-d, --dir-show', 'prints current working directory')
//   .option('-e, --exit-show', 'shows the Exit code')
//   .option('-z, --zero', 'overwrites passed exit code with 0')
//   .option('-v, --version', 'output the version number')
//   .option('-h, --help', 'output usage information')
//   .parse(process.argv)
