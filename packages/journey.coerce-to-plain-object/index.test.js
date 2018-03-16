import coerceToPlainObject from './index'

test('works', () => {
  expect(coerceToPlainObject({})).toEqual({})
  expect(coerceToPlainObject({'a': 'a'})).toEqual({'a': 'a'})
  expect(coerceToPlainObject([])).toEqual({})
  expect(coerceToPlainObject(1)).toEqual({})
})
