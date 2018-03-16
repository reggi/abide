import passThru, {ERROR_NO_FN_PASSED} from './index'

test('passThru: int function', () => {
  expect(() => {
    expect(passThru(1, 2, 3))
  }).toThrow(ERROR_NO_FN_PASSED)
})

test('passThru: str function', () => {
  expect(() => {
    expect(passThru('1', 2, 3))
  }).toThrow(ERROR_NO_FN_PASSED)
})

test('passThru: true function', () => {
  expect(() => {
    expect(passThru(true, 1, 2, 3))
  }).toThrow(ERROR_NO_FN_PASSED)
})

test('passThru: undefined function', () => {
  expect(passThru(undefined, 1, 2, 3)).toEqual([1, 2, 3])
})

test('passThru: false function', () => {
  expect(passThru(false, 1, 2, 3)).toEqual([1, 2, 3])
})

test('passThru: null function', () => {
  expect(passThru(null, 1, 2, 3)).toEqual([1, 2, 3])
})

test('passThru: nothing passed', () => {
  expect(passThru()).toEqual([])
})

test('passThru: sync', () => {
  let value = false
  const fn = (...args) => {
    value = args
    expect(args).toEqual([1, 2, 3])
  }
  expect(passThru(fn, 1, 2, 3)).toEqual([1, 2, 3])
  expect(value).toEqual([1, 2, 3])
})

test('passThru: async', () => {
  const fn = async (...args) => {
    expect(args).toEqual([1, 2, 3])
  }
  expect(passThru(fn, 1, 2, 3)).toEqual([1, 2, 3])
})
