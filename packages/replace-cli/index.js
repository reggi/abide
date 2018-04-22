#!/usr/bin/env node
import command from '@reggi/command'

export default command(module, ({argv, stdin, stdout, exit}) => {
  let accumulate = false
  stdin.setEncoding('utf8')
  stdin.on('data', (data) => {
    if (!accumulate) accumulate = ''
    accumulate += data
  })
  stdin.on('end', () => {
    try {
      const input = argv.slice(2)
      const find = input[0] || false
      const replace = input[1] || false
      if (!find) throw new Error('missing find argument')
      if (!replace) throw new Error('missing replace argument')
      if (!accumulate) throw new Error('no data was piped in')
      const pattern = new RegExp(find, 'gm')
      const result = accumulate.replace(pattern, replace)
      stdout.write(result)
      return exit(0)
    } catch (e) {
      return exit(1)
    }
  })
})
