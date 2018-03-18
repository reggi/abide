#!/usr/bin/env node
const path = require('path')
const args = process.argv.slice(2).join()
const babelBin = path.join(__dirname, '/node_modules/.bin/babel')
const babelConfig = path.join(__dirname, '/.babelrc')
const { spawnSync } = require('child_process')
const babelCmd = (args) => `${babelBin} --no-babelrc --config-file ${babelConfig}${(args !== '') ? ` ${args}` : ''}`
const babelCmdSplit = babelCmd(args).split(' ')
const babelCmdInit = babelCmdSplit.shift()
spawnSync(babelCmdInit, babelCmdSplit, {stdio: 'inherit'})
