import {journey} from '@reggi/journey'
import {pick, defaults, keys, flattenDeep, get, zipObject, uniq, mapValues, groupBy, flatten, map, values, extend, fromPairs, filter, isArray, isPlainObject, range, merge, without} from 'lodash'

const parseFlagOption = journey((flagsOption) => [
  () => ({flagsOption}),
  ({flagsOption}) => ({flagsString: flagsOption.replace(/<.+>|\[.+\]/g, '')}),
  ({flagsString}) => ({flagsString: flagsString.replace(/,/g, ' ')}),
  ({flagsString}) => ({flagsString: flagsString.replace(/\s+/g, ' ')}),
  ({flagsString}) => ({flagsString: flagsString.trim()}),
  ({flagsOption}) => ({required: get(flagsOption.match(/<.+>/g), 0, false)}),
  ({flagsOption}) => ({optional: get(flagsOption.match(/\[.+\]/g), 0, false)}),
  ({flagsString}) => ({flags: flagsString.split(' ')}),
  ({flags, required, optional}) => ({return: {flags, required, optional}})
], {return: true})
// ], {return: true, hook: (acq, res) => console.log(res)})

class Undefined {}
const coerceToString = (val) => (isArray(val) && val.length === 1) ? val[0] : val
const isSingleFlag = (value) => (value) ? Boolean(value.match(/^-\w\w+/)) : false
const isFlag = (value) => (value) ? Boolean(value.match(/^-/)) : false
const touchObj = (arr) => merge(arr.map(v => ({value: v})), range(arr.length).map(() => ({touched: false})))

const mergeProperties = (...objs) => {
  const allKeys = uniq(flatten(map(objs, keys)))
  const mergedObj = zipObject(allKeys)
  return mapValues(mergedObj, (value, key) => {
    const values = map(objs, obj => get(obj, key, new Undefined()))
    const valuesWithoutUndefined = filter(values, (value) => !(value instanceof Undefined))
    return coerceToString(flatten(valuesWithoutUndefined))
  })
}

const parseArgvTouchObj = (touchObj, {groupedSingleFlags = true} = {}) => {
  return touchObj.map(({value, touched}, key) => {
    if (touched) return false
    const combos = []
    const nextValue = get(touchObj, `${key + 1}.value`)
    const thisIsSingleFlag = isSingleFlag(value)
    const thisValueIsFlag = isFlag(value)
    const nextValueIsFlag = isFlag(nextValue)
    touchObj[key].touched = true
    if (groupedSingleFlags) {
      if (thisIsSingleFlag) {
        const content = value.replace(/-/g, '').split('')
        const contentFlags = content.map(flag => ({[`-${flag}`]: true}))
        combos.push(contentFlags)
      }
    }
    if (!thisValueIsFlag) {
      combos.push({_: value})
    } else if (thisValueIsFlag && (nextValueIsFlag || !nextValue)) {
      combos.push({[value]: true})
    } else if (thisValueIsFlag && !nextValueIsFlag) {
      touchObj[key + 1].touched = true
      combos.push({[value]: touchObj[key + 1].value})
    }
    return combos
  })
}

const parseArgv = journey((argv, opts) => [
  () => ({argv, opts}),
  ({argv}) => ({touchObj: touchObj(argv)}),
  ({touchObj, groupedSingleFlags}) => ({parseArgvTouchObj: parseArgvTouchObj(touchObj, opts)}),
  ({parseArgvTouchObj}) => ({flattenDeep: flattenDeep(parseArgvTouchObj)}),
  ({flattenDeep}) => ({without: without(flattenDeep, false)}),
  ({without}) => ({mergeProperties: mergeProperties.apply(null, without)})
], {return: 'mergeProperties'})
// ], {return: 'mergeProperties', hook: (acq, res) => console.log(res)})

const results = parseArgv('hello -max'.split(' '))

const pickDefaults = (obj, props, d = false) => defaults(pick(obj, props), zipObject(props, range(props.length).map(v => d)))

const x = pickDefaults(results, parseFlagOption('-h, -max, --help [req]').flags)
console.log(values(x))

// program
  // .options('-h, --help', {resolveTo: 'help', useAll: true, useFirst: true, useLast: true})


// // export const option = (flags, description) => {
// //   const parsedFlags = parseFlagOption(flags)  
// // }

// // const p = require('commander')

// // function collect(val, memo) {
// //   memo.push(val);
// //   return memo;
// // }

// const support = {
//   '-s -size --size ---size <size>': {flags: ['-s', '--size'], type: 'required'},
//   '-d --drink [drink]': {flags: ['-d', '--drink'], type: 'optional'},
//   '-c, --collect [value]': true,
//   '-c, --cheese [type]': true
// }

// const {args} = program
//   .option('-s')

// args['---s'] // true

// const reggiMinimist = (argv) => {
//   return journey((argv) => {
//     () => ({argv}),
//     ({argv}) => argv.join(' ')
//   })
// }

// > minimist(['-h="hello"', '--h="meow"'])
// { _: [], h: [ '"hello"', '"meow"' ] }
// > minimist(['--h="meow"'])
// { _: [], h: '"meow"' }
// > minimist(['--h', 'meow"'])
// { _: [], h: 'meow"' }
// > minimist(['meow"'])
// { _: [ 'meow"' ] }
// > minimist(['meow"'])

// > minimist(['-h="hello"', '--h="meow"'])

// {_: [], '-h': 'hello', '--h': 'meow'})


// ['-s', '-size', '--size', '---size'] 

// minimist([
//   'hello',
//   '--example',
//   "meow",
//   "meow"
// ])






// console.log(mergeStrToArr({'cat': 'missy'}, {'dogs': true, 'cat': 'felix'}))




