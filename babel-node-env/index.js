const path = require('path')
const args = process.argv.slice(2).join()
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))

// const babelBin = `${__dirname}/node_modules/.bin/babel`
const babelNodeBin = path.join(__dirname, '/node_modules/.bin/babel-node')
const babelEnv = path.join(__dirname, '/node_modules/@babel/preset-env')

const cwd = process.cwd()

const { spawn } = require('child_process')

const babelCmd = (args) => {
  const possible = path.dirname(path.resolve(argv._[0]))
  console.log(possible)
  const babelEnvRelative = (argv._[0]) ? './' + path.relative(possible, babelEnv) : './' + path.relative(cwd, babelEnv)
  return `${babelNodeBin} --presets="[['${babelEnvRelative}',{'targets':{'node':'4.0.0'},'shippedProposals':true}]]"${(args !== '') ? ` ${args}` : ''}`
}
console.log(babelCmd(args))
const babelCmdSplit = babelCmd(args).split(' ')
const babelCmdInit = babelCmdSplit.shift()

spawn(babelCmdInit, babelCmdSplit, {stdio: 'inherit'})
