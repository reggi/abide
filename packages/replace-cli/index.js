#!/usr/bin/env node
// const {stdin, stdout, exit, argv} = require('./process')
const {stdin, stdout, exit, argv} = process

// constants
const args = argv.slice(2)
const invalid = ['', '\n']

;

(() => {
  let ret = ''
  stdin.setEncoding('utf8')
  stdin.on('readable', () => {
    let chunk
    while ((chunk = stdin.read())) {
      ret += chunk
    }
  })
  stdin.on('end', () => {
    try {
      if (args.length !== 2) {
        return exit(1)
      }
      if (invalid.includes(ret.trim())) {
        return exit(1)
      }
      const pattern = new RegExp(args[0], 'gm')
      const result = ret.replace(pattern, args[1])
      stdout.write(result)
      return exit(0)
    } catch (e) {
      return exit(1)
    }
  })
})()
