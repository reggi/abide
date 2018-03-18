import propOverwrite from './index.js'

test('propOverwrite: overwrite false', () => {
  const example = {'important': 'a'}
  const result = propOverwrite(false, example, {'important': 'b'})
  expect(result).toEqual({important: 'a'})
})

test('propOverwrite: overwrite true', () => {
  const example = {'important': 'a'}
  const result = propOverwrite(true, example, {'important': 'b'})
  expect(result).toEqual({important: 'b'})
})
