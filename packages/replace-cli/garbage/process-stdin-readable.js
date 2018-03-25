let ret = ''
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  let chunk
  while ((chunk = process.stdin.read())) {
    ret += chunk
  }
})
process.stdin.on('error', (error) => {
  console.log('error')
  if (error) throw error
})
process.stdin.on('end', () => {
  console.log({ret})
})
