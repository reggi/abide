process.stdin.setEncoding('utf8')
process.stdin.on('data', (data) => {
  console.log(data)
})
process.stdin.on('error', (error) => {
  console.log('error')
  if (error) throw error
})
process.stdin.on('end', () => {
  console.log('end')
})
process.stdin.resume()
