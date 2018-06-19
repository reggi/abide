import here from './index'
import sinon from 'sinon'
import execa from 'execa'

const getArgs = (argv, workingDir) => ({
  argv: ['node', './index.js', ...argv],
  stdout: {write: sinon.spy()},
  stderr: {write: sinon.spy()},
  exit: sinon.spy(),
  cwd: () => workingDir
})

beforeEach(async () => {
  await execa.shell(`
    cd ${__dirname}
    mkdir -p scripts
    cd scripts
    printf "USAGE='--a (echo hi)'\na () { echo 'hi'; }\n" > 001-a.sh 
    printf "USAGE='--b (echo hi)'\nb () { echo 'hi'; }\n" > 001-b.sh
    printf "USAGE='--c (echo hi)'\nc () { echo 'hi'; }\n" > 001-c.sh
  `)
})

afterEach(async () => {
  await execa.shell(`
    cd ${__dirname}
    rm -rf ./scripts
  `)
})

test('here', async () => {
  const args = getArgs(['--help'], __dirname)
  await here(args)
  expect(args.exit.called).toBe(true)
  expect(args.exit.args).toEqual([[0]])
})
