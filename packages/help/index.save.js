
// import {
//   chain,
//   set,
//   get,
//   merge,
//   range,
//   isArray,
//   filter,
//   keys,
//   map
// } from 'lodash'

// export const parseFlagOption = journey((flagsOption) => [
//   () => ({flagsOption}),
//   ({flagsOption}) => ({flagsString: flagsOption.replace(/<.+>|\[.+\]/g, '')}),
//   ({flagsString}) => ({flagsString: flagsString.replace(/,/g, ' ')}),
//   ({flagsString}) => ({flagsString: flagsString.replace(/\s+/g, ' ')}),
//   ({flagsString}) => ({flagsString: flagsString.trim()}),
//   ({flagsOption}) => ({required: get(flagsOption.match(/<.+>/g), 0, false)}),
//   ({flagsOption}) => ({optional: get(flagsOption.match(/\[.+\]/g), 0, false)}),
//   ({flagsString}) => ({flags: flagsString.split(' ')}),
//   ({flags, required, optional}) => ({return: {flags, required, optional}})
// ], {return: true})

// export const touchObj = (arr) => merge(arr.map(v => ({value: v})), range(arr.length).map(() => ({touched: false})))
// export class Undefined {}
// export const coerceToString = (val) => (isArray(val) && val.length === 1) ? val[0] : val
// export const isGroupedSingleFlag = (value) => (value) ? Boolean(value.match(/^-\w\w+/)) : false
// export const hasEqual = (value) => (value) ? Boolean(value.match(/=/)) : false
// export const isFlag = (value) => (value) ? Boolean(value.match(/^-/)) : false

// export const parseArgvTouchObj = (touchObj, {
//   groupedSingleFlagsNoValue = false,
//   groupedSingleFlagsSpread = true,
//   flagTypes = {}
// } = {}) => {
//   return chain(touchObj).map(({value, touched}, key) => {
//     if (touched) return false
//     const combos = []
//     const nextValue = get(touchObj, `${key + 1}.value`)
//     const thisIsGroupedSingleFlag = isGroupedSingleFlag(value)
//     const thisValueIsFlag = isFlag(value)
//     const nextValueIsFlag = isFlag(nextValue)
//     touchObj[key].touched = true
//     if (groupedSingleFlagsSpread) {
//       if (thisIsGroupedSingleFlag) {
//         const content = value.replace(/-/g, '').split('')
//         const contentFlags = content.map(flag => ({[`-${flag}`]: true}))
//         combos.concat(contentFlags)
//       }
//     }
//     if (hasEqual(value)) {
//       const valueSplit = value.split('=')
//       combos.push({[valueSplit[0]]: valueSplit[1]})
//     } else if (!thisValueIsFlag) {
//       combos.push({_: value})
//     } else if (thisValueIsFlag && (nextValueIsFlag || !nextValue)) {
//       combos.push({[value]: true})
//     } else if (thisValueIsFlag && !nextValueIsFlag) {
//       touchObj[key + 1].touched = true
//       combos.push({[value]: touchObj[key + 1].value})
//     }
//     if (groupedSingleFlagsNoValue) {
//       return filter(combos, combo => {
//         const flag = keys(combo)[0]
//         return thisIsGroupedSingleFlag(flag)
//       })
//     }
//     return combos
//   })
//   .flattenDeep()
//   .value()
// }

// const mergeProperties = (...objs) => {
//   const allKeys = uniq(flatten(map(objs, keys)))
//   const mergedObj = zipObject(allKeys)
//   return mapValues(mergedObj, (value, key) => {
//     const values = map(objs, obj => get(obj, key, new Undefined()))
//     const valuesWithoutUndefined = filter(values, (value) => !(value instanceof Undefined))
//     return coerceToString(flatten(valuesWithoutUndefined))
//   })
// }

// const parseArgv = journey((argv, opts) => [
//   () => ({argv, opts}),
//   ({argv}) => ({touchObj: touchObj(argv)}),
//   ({touchObj, groupedSingleFlags}) => ({parseArgvTouchObj: parseArgvTouchObj(touchObj, opts)}),
//   ({parseArgvTouchObj}) => ({flattenDeep: flattenDeep(parseArgvTouchObj)}),
//   ({flattenDeep}) => ({without: without(flattenDeep, false)}),
//   ({without}) => ({mergeProperties: mergeProperties.apply(null, without)})
// ], {return: 'mergeProperties'})
// // ], {return: 'mergeProperties', hook: (acq, res) => console.log(res)})



// const results = parseArgv('hello -max'.split(' '))

// const pickDefaults = (obj, props, d = false) => defaults(pick(obj, props), zipObject(props, range(props.length).map(v => d)))

// results['-h'] || results['--help']

// const x = pickDefaults(results, parseFlagOption('-h, -max, --help [req]').flags)
// console.log(values(x))

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

// import {pick, defaults, keys, flattenDeep, get, zipObject, uniq, mapValues, groupBy, flatten, map, values, extend, fromPairs, filter, isArray, isPlainObject, range, merge, without} from 'lodash'

// class ReturnError {}


  //   () => ({touchObj, thisValue: value, touched, thisKey, groupedSingleFlagsNoValue, groupedSingleFlagsSpread, flagTypes}),
  //   ({thisKey}) => ({nextKey: thisKey + 1}),
  //   ({touchObj, nextKey}) => ({nextValue: get(touchObj, `${nextKey}.value`)}),
  //   ({touched}) => (touched) ? throwError('already touched', ReturnError) : false,
  //   ({thisValue}) => ({thisValueIsGroupedSingleFlag: isGroupedSingleFlag(value)}),
  //   ({thisValue}) => ({thisValueIsFlag: isFlag(thisValue)}),
  //   ({nextValue}) => ({nextValueIsFlag: isFlag(nextValue)}),
  //   () => set(touchObj, `${thisKey}.touched`, true),
  //   (d) => ({spreadFlags: (d.groupedSingleFlagsSpread && d.thisIsGroupedSingleFlag)}),
  //   ({spreadFlags, thisValue}) => conditional(spreadflags, journey(() => [
  //     () => ({indivFlag: thisValue.replace(/-/g, '').split('')}),

  //     contentFlags = content.map(flag => ({[`-${flag}`]: true}))
  //     combos.concat(contentFlags)
  //   ]))
  // ]))})


  
const touchObjectJourney = journey(({opt, value, touched, key}) => [
  () => ({opt, value, touched, key}),
  ({key}) => ({nextKey: key + 1}),
  ({touchObj, nextKey}) => ({nextValue: get(touchObj, `${nextKey}.value`)}),
  ({touched}) => (touched) ? throwError('already touched', ReturnError) : false,
  ({thisValue}) => ({thisValueIsGroupedSingleFlag: isGroupedSingleFlag(value)}),
  ({thisValue}) => ({thisValueIsFlag: isFlag(thisValue)}),
  ({nextValue}) => ({nextValueIsFlag: isFlag(nextValue)}),
  () => set(touchObj, `${thisKey}.touched`, true),
  (d) => ({spreadFlags: (d.groupedSingleFlagsSpread && d.thisIsGroupedSingleFlag)}),
])

const mapCallbackTouchObj = (opt) => ({value, touched, key}) => {
  if (touched) return false
  return touchObjectJourney({opt, value, touched, key})
}

const parsedTouchObj = (touchObj, opt) => {
  return chain(touchObj)
    .map(mapCallbackTouchObj(opt))
    .without(false)
    .values()
}


// journey((argv, {
//   groupedSingleFlagsNoValue = false,
//   groupedSingleFlagsSpread = true,
//   flagTypes = {}
// }) => [
//   () => ({argv}),
//   ({argv}) => ({touchObj: touchObj(argv)}),
//   ({touchObj}) => ({parsedTouchObj: map(touchObj, journey(({value, touched, thisKey}) => [
//     () => ({touchObj, thisValue: value, touched, thisKey, groupedSingleFlagsNoValue, groupedSingleFlagsSpread, flagTypes}),
//     ({thisKey}) => ({nextKey: thisKey + 1}),
//     ({touchObj, nextKey}) => ({nextValue: get(touchObj, `${nextKey}.value`)}),
//     ({touched}) => (touched) ? throwError('already touched', ReturnError) : false,
//     ({thisValue}) => ({thisValueIsGroupedSingleFlag: isGroupedSingleFlag(value)}),
//     ({thisValue}) => ({thisValueIsFlag: isFlag(thisValue)}),
//     ({nextValue}) => ({nextValueIsFlag: isFlag(nextValue)}),
//     () => set(touchObj, `${thisKey}.touched`, true),
//     (d) => ({spreadFlags: (d.groupedSingleFlagsSpread && d.thisIsGroupedSingleFlag)}),
//     ({spreadFlags, thisValue}) => conditional(spreadflags, journey(() => [
//       () => ({indivFlag: thisValue.replace(/-/g, '').split('')}),

//       contentFlags = content.map(flag => ({[`-${flag}`]: true}))
//       combos.concat(contentFlags)
//     ]))
//   ]))})
// ])

import journey from '@reggi/journey'
import ReturnError from '@reggi/journey.return-error'

const throwReturn = (value) => {
  throw new ReturnError(value)
}

const example = journey((name, age) => [
  () => ({name, age}),
  ({age}) => (age >= 18) ? {adult: true} : {adult: false},
  ({adult}) => (!adult) ? throwReturn('child') : {cont: true},
  () => ({
    makeRequestForAdults: 'adult',
    errorHook: (e, acq, lineReturn, exitReturn) => {
      if (e instanceof ReturnError) {
        return exitReturn(e.value)
      }
      throw e
    }
  })
], {return: 'makeRequestForAdults'})

console.log(example('thomas', 12))
// console.log(Return('hi').value)

// const x = () => Promise.resolve()
//   .then(() => {
//     throw new ReturnError(true)
//   })
//   .catch(e => {
//     if (e instanceof ReturnError) {
//       return e.value
//     }
//   })

// x()
//   .then(console.log)

