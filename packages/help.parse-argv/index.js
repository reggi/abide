import { each, cloneDeep, isArray, get, zipObject, keys, mapValues, uniq, flatten, map, last, filter, slice, merge, range, chain } from 'lodash'
import filterUntil from '@reggi/help.filter-until'
import setEntire from '@reggi/help.set-entire'

export const dash = /^-(\w+)/
export const multiDash = /^-(\w\w+)/
export const doubleDash = /^--([\w|-]+)/
export const doubleDashNo = /^--no-(\w+)/
export const onlyDash = /^-(\w)$|^-(\w)=/
export const anyDash = /^-+([\w|-]+)$|^-+([\w|-]+)=.+$/
export const child = /^(--)$/
export const childKey = '--'
export const doubleDashNoKeyPrefix = '--'

export const matchCheck = (patternString, statement) => {
  const match = statement.match(patternString)
  const hasGroupOne = (match && match[1] && match[1] !== '') ? match[1] : false
  const hasGroupTwo = (match && match[2] && match[2] !== '') ? match[2] : false
  const group = hasGroupOne || hasGroupTwo
  if (!group) return false
  match.group = group
  return match
}

export const isAnyDash = (statement) => matchCheck(anyDash, statement)
export const isDashFlag = (statement) => matchCheck(dash, statement)
export const isOnlyDashFlag = (statement) => matchCheck(onlyDash, statement)
export const isMultiDashFlag = (statement) => matchCheck(multiDash, statement)
export const isDoubleDashFlag = (statement) => matchCheck(doubleDash, statement)
export const isDoubleDashNoFlag = (statement) => matchCheck(doubleDashNo, statement)
export const isChild = (statement) => matchCheck(child, statement)

export const assignBoolean = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  argvTouch[key].touched = true
  return {[validCase[0]]: true}
}

export const assignEqual = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  const split = item.split('=')
  if (split.length === 1) return false
  argvTouch[key].touched = true
  return {[split[0]]: split[1]}
}

export const assignNext = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  if (!argvTouch[key + 1]) return false
  const next = argvTouch[key + 1]
  if (isAnyDash(next.value)) return false
  argvTouch[key].touched = true
  argvTouch[key + 1].touched = true
  return {[validCase[0]]: next.value}
}

export const assignUntil = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  if (argvTouch.length === key + 1) return false
  const values = slice(argvTouch, key + 1)
  const validValues = filterUntil(values, (item) => isAnyDash(item.value))
  if (!validValues.length) return false
  const value = validValues.map(i => i.value).join(' ')
  argvTouch[key].touched = true
  each(validValues, i => {
    argvTouch[i.key].touched = true
  })
  return {[validCase[0]]: value}
}

export const assignSpread = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  argvTouch[key].touched = true
  return validCase[1].split('').map(flag => ({[`-${flag}`]: true}))
}

export const assignNo = (criteria, criteriaKeyPrefix) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  argvTouch[key].touched = true
  return {[`${criteriaKeyPrefix}${validCase[1]}`]: false}
}

export const assignRest = (criteria, criteriaKey) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  const validValues = slice(argvTouch, key + 1)
  if (!validValues.length) return false
  const value = validValues.map(i => i.value).join(' ')
  argvTouch[key].touched = true
  each(validValues, i => {
    argvTouch[i.key].touched = true
  })
  return {[criteriaKey]: value}
}

export const _modifiers = {
  'anyDash.bool': assignBoolean(isAnyDash),
  'anyDash.equal': assignEqual(isAnyDash),
  'anyDash.next': assignNext(isAnyDash),
  'anyDash.until': assignUntil(isAnyDash),
  'onlyDash.bool': assignBoolean(isOnlyDashFlag),
  'onlyDash.equal': assignEqual(isOnlyDashFlag),
  'onlyDash.next': assignNext(isOnlyDashFlag),
  'onlyDash.until': assignUntil(isOnlyDashFlag),
  'multiDash.bool': assignBoolean(isMultiDashFlag),
  'multiDash.equal': assignEqual(isMultiDashFlag),
  'multiDash.next': assignNext(isMultiDashFlag),
  'multiDash.until': assignUntil(isMultiDashFlag),
  'multiDash.spread': assignSpread(isMultiDashFlag),
  'dash.bool': assignBoolean(isDashFlag),
  'dash.equal': assignEqual(isDashFlag),
  'dash.next': assignNext(isDashFlag),
  'dash.until': assignUntil(isDashFlag),
  'doubleDash.bool': assignBoolean(isDoubleDashFlag),
  'doubleDash.equal': assignEqual(isDoubleDashFlag),
  'doubleDash.next': assignNext(isDoubleDashFlag),
  'doubleDash.until': assignUntil(isDoubleDashFlag),
  'doubleDash.no': assignNo(isDoubleDashNoFlag, doubleDashNoKeyPrefix),
  'child.rest': assignRest(isChild, childKey)
}

export const modifiers = setEntire(_modifiers)
export const touchObj = (arr) => merge(arr.map((value, key) => ({value, key})), range(arr.length).map(() => ({touched: false})))
export class Undefined {}
export const coerceToString = (val) => (isArray(val) && val.length === 1) ? val[0] : val

export const applySpecifier = (specifiers, argv, argvTouch) => {
  return chain(specifiers)
    .map((fn, pattern) => {
      return chain(argv)
        .map((item, key) => {
          if (item.match(new RegExp(pattern))) {
            return fn(argvTouch)(item, key)
          }
          return false
        })
        .without(false)
        .value()
    })
    .value()
}

export const applyGeneral = (fns, argv, argvTouch) => {
  return chain(fns)
    .flattenDeep()
    .reduce((acq, fn) => {
      const result = chain(argvTouch)
        .mapValues((obj, key) => {
          const _obj = cloneDeep(obj)
          _obj.result = fn(argvTouch)(_obj.value, key)
          return _obj
        })
        .filter(obj => {
          return (obj.result !== false)
        })
        .value()
      return [acq, result]
    }, [])
    .flattenDeep()
    .sortBy('key')
    .map(obj => obj.result)
    .value()
}

export function groupByIncrementingProp (collection, prop = 'key') {
  const results = []
  var bundle = []
  each(collection, (obj, key) => {
    if (!bundle.length || (obj[prop] - 1) !== last(bundle)[prop]) {
      bundle = []
      bundle.push(obj)
    } else if (obj[prop] - 1 === last(bundle)[prop]) {
      bundle.push(obj)
    }
    if (!collection[key + 1] || obj[prop] + 1 !== collection[key + 1][prop]) {
      results.push(bundle)
    }
  })
  return results
}

export const untouched = (argvTouch) => {
  return chain(argvTouch)
    .filter((obj) => !obj.touched)
    .thru(groupByIncrementingProp)
    .map(group => map(group, i => i.value))
    .value()
}

export const mergeProperties = (arrOfObjects) => {
  const allKeys = uniq(flatten(map(arrOfObjects, keys)))
  const mergedObj = zipObject(allKeys)
  return mapValues(mergedObj, (value, key) => {
    const values = map(arrOfObjects, obj => get(obj, key, new Undefined()))
    const valuesWithoutUndefined = filter(values, (value) => !(value instanceof Undefined))
    return coerceToString(uniq(flatten(valuesWithoutUndefined)))
  })
}

export const defaultModifiers = [
  modifiers.child.rest,
  modifiers.doubleDash.no,
  modifiers.doubleDash.equal,
  modifiers.doubleDash.next,
  modifiers.doubleDash.bool,
  modifiers.onlyDash.bool,
  modifiers.multiDash.spread
]

export const parseArgv = (argv, {modifiers = defaultModifiers, specifiers = false} = {}) => {
  const argvTouch = touchObj(argv)
  const specifiersRes = (specifiers) ? applySpecifier(specifiers, argv, argvTouch) : []
  const generalRes = (modifiers) ? applyGeneral(modifiers, argv, argvTouch) : []
  return chain([specifiersRes, generalRes, {_: untouched(argvTouch)}])
    .flattenDeep()
    .thru(mergeProperties)
    .value()
}

export default parseArgv
