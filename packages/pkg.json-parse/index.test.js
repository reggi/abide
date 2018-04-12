import jsonParseForgive from './index'

test('jsonParseForgive', () => {
  expect(jsonParseForgive('{"apple": "Jobs"}')).toEqual({apple: 'Jobs'})
  expect(jsonParseForgive('<')).toEqual(false)
})
