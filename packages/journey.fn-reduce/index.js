import coerceToPlainObject from '@reggi/journey.coerce-to-plain-object'
import passThru from '@reggi/journey.pass-thru'
import isPromise from '@reggi/journey.is-promise'

export const fnReduce = (fns, state = {}, hook) => {
  return fns.reduce((acq, fn) => {
    const handleResult = (acq, result) => cleanResult.apply(null, hookResult(acq, result))
    const cleanResult = (acq, result) => ({...coerceToPlainObject(acq), ...coerceToPlainObject(result)})
    const hookResult = (acq, result) => passThru(hook, acq, result)
    const handleResultPossiblePromise = (acq, result) => {
      const resultIsPromise = isPromise(result)
      if (resultIsPromise) return result.then(result => handleResult(acq, result))
      return handleResult(acq, result)
    }
    const handleAcqPossiblePromise = (acq) => {
      const acqIsPromise = isPromise(acq)
      if (acqIsPromise) return acq.then(acq => handleResultPossiblePromise(acq, fn(acq)))
      return handleResultPossiblePromise(acq, fn(acq))
    }
    return handleAcqPossiblePromise(acq)
  }, state)
}

export default fnReduce
