import isLocalModule from './index'

test('isLocalModule', () => {
  expect(isLocalModule('/lodash')).toEqual(true)
  expect(isLocalModule('./lodash')).toEqual(true)
  expect(isLocalModule('../lodash')).toEqual(true)
  expect(isLocalModule('lodash')).toEqual(false)
  expect(isLocalModule('@reggi/lodash')).toEqual(false)
})
