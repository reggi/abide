import coerceToArray from './index'

test('works', () => {
  expect(coerceToArray(1)).toEqual([1])
  expect(coerceToArray([1])).toEqual([1])
  expect(coerceToArray('A')).toEqual(['A'])
  expect(coerceToArray({})).toEqual([{}])
})
