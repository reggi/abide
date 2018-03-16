import fnReduce from './index.js'

test('fnReduce: sync', () => {
  const expectation = { name: 'Thomas', age: '29', return: 'Thomas29' }
  const name = expectation.name
  const results = fnReduce([
    () => ({name}),
    () => ({age: '29'}),
    ({name, age}) => ({return: name + age})
  ])
  expect(results).toEqual(expectation)
})

test('fnReduce: async', () => {
  const expectation = { name: 'Thomas', age: '29', return: 'Thomas29' }
  const name = expectation.name
  const results = fnReduce([
    () => ({name}),
    async () => ({age: '29'}),
    ({name, age}) => ({return: name + age})
  ])
  expect(results).resolves.toEqual(expectation)
})
