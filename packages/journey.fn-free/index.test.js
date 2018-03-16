import fnFree, {ERROR_FN_NOT_FN, ERROR_RESOLVE_NOT_FN} from './index'

test('fnFree: with props', () => {
  const animal = () => 'tiger'
  const result = fnFree(animal, (animal) => `bengal ${animal}`, ['journey'])
  expect(result()).toBe('bengal tiger')
  expect(result.journey()).toBe('tiger')
})

test('fnFree: without props', () => {
  const animal = () => 'tiger'
  const result = fnFree(animal, (animal) => `bengal ${animal}`)
  expect(result()).toBe('bengal tiger')
})

test('fnFree: no fn', () => {
  expect(() => {
    fnFree(false, (animal) => `bengal ${animal}`)
  }).toThrow(ERROR_FN_NOT_FN)
})

test('fnFree: no resolve', () => {
  const animal = () => 'tiger'
  expect(() => {
    fnFree(animal, false)
  }).toThrow(ERROR_RESOLVE_NOT_FN)
})

test('fnFree: with async', () => {
  const animal = async () => 'tiger'
  const result = fnFree(animal, (animal) => `bengal ${animal}`, ['journey'])
  expect(result()).resolves.toBe('bengal tiger')
  expect(result.journey()).resolves.toBe('tiger')
})
