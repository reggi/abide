import {
  cloneDeep,
  isArray,
  get,
  zipObject,
  keys,
  mapValues,
  uniq,
  flatten,
  map,
  last,
  filter,
  slice,
  merge,
  range,
  chain,
  each,
  set } from 'lodash'

export const dash = /^-(\w+)/
export const multiDash = /^-(\w\w+)/
export const doubleDash = /^--([\w|-]+)/
export const onlyDash = /^-(\w)$|^-(\w)=/
export const anyDash = /^-+([\w|-]+)$|^-+([\w|-]+)=.+$/

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
export const isMulitDashFlag = (statement) => matchCheck(multiDash, statement)
export const isDoubleDashFlag = (statement) => matchCheck(doubleDash, statement)

const assignBoolean = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  argvTouch[key].touched = true
  return {[validCase[0]]: true}
}

const assignEqual = (criteria) => (argvTouch) => (item, key) => {
  if (argvTouch[key].touched) return false
  const validCase = criteria(item)
  if (!validCase) return false
  const split = item.split('=')
  if (split.length === 1) return false
  argvTouch[key].touched = true
  return {[split[0]]: split[1]}
}

const assignNext = (criteria) => (argvTouch) => (item, key) => {
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

const filterUntil = (arr, matchFn) => {
  var match = false
  return filter(arr, (item) => {
    if (match) return false
    const isMatch = matchFn(item)
    if (isMatch) match = true
    if (match) return false
    return true
  })
}

// console.log(filterUntil(['ants', 'donkey', 'fish', 'seal'], (item) => item === 'fish'))

const assignUntil = (criteria) => (argvTouch) => (item, key) => {
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

const setObjProps = (obj) => {
  const newObj = {}
  each(obj, (value, key) => {
    set(newObj, key, value)
  })
  return newObj
}

const _modifiers = {
  'anyDash.bool': assignBoolean(isAnyDash),
  'anyDash.equal': assignEqual(isAnyDash),
  'anyDash.next': assignNext(isAnyDash),
  'anyDash.until': assignUntil(isAnyDash),
  'onlyDash.bool': assignBoolean(isOnlyDashFlag),
  'onlyDash.equal': assignEqual(isOnlyDashFlag),
  'onlyDash.next': assignNext(isOnlyDashFlag),
  'onlyDash.until': assignUntil(isOnlyDashFlag),
  'multiDash.bool': assignBoolean(isMulitDashFlag),
  'multiDash.equal': assignEqual(isMulitDashFlag),
  'multiDash.next': assignNext(isMulitDashFlag),
  'multiDash.until': assignUntil(isMulitDashFlag),
  'multiDash.spread': (argvTouch) => (item, key) => {
    if (argvTouch[key].touched) return false
    const validCase = isMulitDashFlag(item)
    if (!validCase) return false
    argvTouch[key].touched = true
    return validCase[1].split('').map(flag => ({[`-${flag}`]: true}))
  },
  'dash.bool': assignBoolean(isDashFlag),
  'dash.equal': assignEqual(isDashFlag),
  'dash.next': assignNext(isDashFlag),
  'dash.until': assignUntil(isDashFlag),
  'doubleDash.bool': assignBoolean(isDoubleDashFlag),
  'doubleDash.equal': assignEqual(isDoubleDashFlag),
  'doubleDash.next': assignNext(isDoubleDashFlag),
  'doubleDash.until': assignUntil(isDoubleDashFlag),
  'doubleDash.no': (argvTouch) => (item, key) => {
    if (argvTouch[key].touched) return false
    const criteria = item.match(/--no-(\w+)/)
    if (!criteria || !criteria[1]) return false
    argvTouch[key].touched = true
    return {[`--${criteria[1]}`]: false}
  },
  'child.rest': (argvTouch) => (item, key) => {
    if (argvTouch[key].touched) return false
    if (!item.match(/^--$/)) return false
    if (argvTouch.length === key + 1) return false
    const validValues = slice(argvTouch, key + 1)
    if (!validValues.length) return false
    const value = validValues.map(i => i.value).join(' ')
    argvTouch[key].touched = true
    each(validValues, i => {
      argvTouch[i.key].touched = true
    })
    return {'--': value}
  }
}

export const modifiers = setObjProps(_modifiers)
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

// console.log(parseArgv(['-G', '-max', '--cake', 'chocolate', 'walnut', '--', '--meow', 'hello', 'mom', 'love', '--dolphin'], [
// const res = parseArgv(['--hello', '-g'], {modifiers: [
//   modifiers.anyDash.bool
// ]})
// console.log(res)
