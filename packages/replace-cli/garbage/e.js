console.log('1')
require('./example')
delete require.cache[require.resolve('./example.js')]
console.log('2')
require('./example')
delete require.cache[require.resolve('./example.js')]
console.log('3')
require('./example')
