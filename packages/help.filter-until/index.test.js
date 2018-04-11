import filterUntil from './index.js'

test('filterUntil', () => {
  const fn = (value) => value !== 'a'
  const d = filterUntil(['a', 'a', 'a', 'a', 'b', 'a', 'a'], fn)
  expect(d).toEqual(['a', 'a', 'a', 'a'])
})

test('filterUntil: without fn', () => {
  const d = filterUntil(['a', 'a', 'a', 'a', 'b', 'a', 'a'])
  expect(d).toEqual(['a', 'a', 'a', 'a', 'b', 'a', 'a'])
})

test('filterUntil: example 2', () => {
  const fn = (item) => item === 'fish'
  const d = filterUntil(['ants', 'donkey', 'fish', 'seal'], fn)
  expect(d).toEqual(['ants', 'donkey'])
})
