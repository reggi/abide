import isPromise from '@reggi/journey.is-promise'
export const ERROR_NO_FN_PASSED = 'first argument should be a function or falsey'

export const passThru = (fn, ...args) => {
  if (!fn) return args
  if (typeof fn !== 'function') throw new Error(ERROR_NO_FN_PASSED)
  const fnResult = fn.apply(null, args)
  if (isPromise(fnResult)) fnResult.then()
  return args
}

export default passThru
