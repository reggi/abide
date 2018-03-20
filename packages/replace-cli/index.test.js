import cliTest from '@reggi/cli-test'

test('test replace', async () => {
  const one = await cliTest('Hello World!', `node ${__dirname}/index.js "World" "Thomas"`)
  expect(one.stdout).toEqual('Hello Thomas!')
  expect(one.code).toEqual(0)
  const two = await cliTest('Hello World!', `node ${__dirname}/index.js "World" "Thomas"`)
  expect(two.stdout).toEqual('Hello Thomas!')
  expect(two.code).toEqual(0)
})

// test('test replace', async () => {
//   try {
//     await cliTest('Hello World!', `node ${__dirname}/index.js "/\w'?/" "Thomas"`, 50)
//   } catch (e) {
//     expect(e instanceof Error).toEqual(true)
//   }
// })
