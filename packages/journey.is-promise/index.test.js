import isPromise from './'

test('isPromise', () => {
  const promA = async () => true
  const promB = () => Promise.resolve(true)
  expect(isPromise(true)).toBeFalsy()
  expect(isPromise(() => {})).toBeFalsy()
  expect(isPromise(promA())).toBeTruthy()
  expect(isPromise(promB())).toBeTruthy()
})
