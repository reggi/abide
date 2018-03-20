// #!/usr/bin/env node
const getStdin = require('get-stdin')
const args = process.argv.slice(2)

getStdin().then(str => {
  try {
    if (str === '') return process.exit(0)
    const pattern = new RegExp(args[0], 'gm')
    process.stdout.write(str.replace(pattern, args[1]))
    return process.exit(0)
  } catch (e) {
    return process.exit(1)
  }
})
