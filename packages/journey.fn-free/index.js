import isPromise from '@reggi/journey.is-promise'

export const ERROR_FN_NOT_FN = 'fn arg is not function type'
export const ERROR_RESOLVE_NOT_FN = 'resolve arg is not function type'

export const fnFree = (fn, resolve, props = []) => {
  if (typeof fn !== 'function') throw new Error(ERROR_FN_NOT_FN)
  if (typeof resolve !== 'function') throw new Error(ERROR_RESOLVE_NOT_FN)
  const main = (...args) => {
    const fnResult = fn.apply(null, args)
    if (isPromise(fnResult)) return fnResult.then(resolve)
    return resolve(fnResult)
  }
  props.forEach(prop => {
    main[prop] = fn
  })
  return main
}

export default fnFree
