import {
  processPreserve,
  processReset,
  processOverwrite,
  log
} from '@reggi/process-mock'
import pkg from './package.json'

const version = pkg.version
const preserve = processPreserve()

const help = `
  Usage: index [options] [-- <args>...]

  print clear exit code from command

  Options:

    -n, --no-color      remove color
    -i, --inherit       inherit stdin
    -c, --command-show  prints command evaluted
    -p, --path-show     prints current working path
    -d, --dir-show      prints current working directory
    -e, --exit-show     shows the Exit code
    -z, --zero          overwrites passed exit code with 0
    -v, --version       output the version number
    -h, --help          output usage information
`

afterEach(() => {
  jest.resetAllMocks()
  jest.resetModules()
  processReset(preserve)
})

test('results-cli: display help (--help)', () => {
  process = processOverwrite(['--help'])
  require('./index')
  expect(process.exit.called).toEqual(true)
  expect(process.exit.args[0][0]).toEqual(0)
  expect(process.stdout.write.called).toEqual(true)
  expect(process.stdout.write.args.slice(-1)[0][0]).toEqual(help)
  log(process.stdout.write.args.length)
  log(process.stdout.write.args)
})

// test('results-cli: display help (--help) reguardless', () => {
//   process = processOverwrite(['--help', '--', 'echo', 'hello'])
//   require('./index')
//   expect(process.exit.called).toEqual(true)
//   expect(process.exit.args[0][0]).toEqual(0)
//   expect(process.stdout.write.called).toEqual(true)
//   expect(process.stdout.write.args.slice(-1)[0][0]).toEqual(help)
//   logs.push(process.stdout.write.args)
// })

// test('results-cli: display version', () => {
//   process = processOverwrite(['--version'])
//   require('./index')
//   expect(process.exit.called).toEqual(true)
//   expect(process.exit.args[0][0]).toEqual(0)
//   expect(process.stdout.write.called).toEqual(true)
//   expect(process.stdout.write.args.slice(-1)[0][0]).toEqual(`${version}\n`)
//   logs.push(process.stdout.write.args)
// })
