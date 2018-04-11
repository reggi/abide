import assert from 'assert'
import bluebird from 'bluebird'
import stringArgv from '@reggi/help.string-argv'
import {
  isAnyDash,
  isDashFlag,
  isOnlyDashFlag,
  isMultiDashFlag,
  isDoubleDashFlag,
  isDoubleDashNoFlag,
  isChild,
  parseArgv,
  assignBoolean,
  assignEqual,
  assignNext,
  assignUntil,
  assignSpread,
  assignNo,
  assignRest
} from './index'

test('isChild', () => {
  expect(isChild('-m')).toBeFalsy()
  expect(isChild('-m=thomas')).toBeFalsy()
  expect(isChild('-max')).toBeFalsy()
  expect(isChild('--max')).toBeFalsy()
  expect(isChild('--')).toBeTruthy()
})

test('isDoubleDashNoFlag', () => {
  expect(isDoubleDashNoFlag('-m')).toBeFalsy()
  expect(isDoubleDashNoFlag('-m=thomas')).toBeFalsy()
  expect(isDoubleDashNoFlag('-max')).toBeFalsy()
  expect(isDoubleDashNoFlag('--max')).toBeFalsy()
  expect(isDoubleDashNoFlag('--no-max=hello')).toBeTruthy()
})

test('isAnyDash', () => {
  expect(isAnyDash('-m')).toBeTruthy()
  expect(isAnyDash('-m=thomas')).toBeTruthy()
  expect(isAnyDash('-max')).toBeTruthy()
  expect(isAnyDash('--max')).toBeTruthy()
  expect(isAnyDash('--max=-m')).toBeTruthy()
})

test('isOnlyDashFlag', () => {
  expect(isOnlyDashFlag('-m')).toBeTruthy()
  expect(isOnlyDashFlag('-m=thomas')).toBeTruthy()
  expect(isOnlyDashFlag('-max')).toBeFalsy()
  expect(isOnlyDashFlag('--max')).toBeFalsy()
  expect(isOnlyDashFlag('--max=-m')).toBeFalsy()
})

test('isDashFlag', () => {
  expect(isDashFlag('-m')).toBeTruthy()
  expect(isDashFlag('-m=thomas')).toBeTruthy()
  expect(isDashFlag('-max')).toBeTruthy()
  expect(isDashFlag('--max')).toBeFalsy()
  expect(isDashFlag('--max=-m')).toBeFalsy()
})

test('isMultiDashFlag', () => {
  expect(isMultiDashFlag('-m')).toBeFalsy()
  expect(isMultiDashFlag('-m=thomas')).toBeFalsy()
  expect(isMultiDashFlag('-max')).toBeTruthy()
  expect(isMultiDashFlag('--max')).toBeFalsy()
  expect(isMultiDashFlag('--max=-m')).toBeFalsy()
})

test('isDoubleDashFlag', () => {
  expect(isDoubleDashFlag('-m')).toBeFalsy()
  expect(isDoubleDashFlag('-m=thomas')).toBeFalsy()
  expect(isDoubleDashFlag('-max')).toBeFalsy()
  expect(isDoubleDashFlag('--max')).toBeTruthy()
  expect(isDoubleDashFlag('--max=-m')).toBeTruthy()
})

// assignBoolean

test('assignBoolean: returns false already touched', () => {
  const results = assignBoolean(isDashFlag)([{ value: '-h', key: 0, touched: true }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignBoolean: returns false not match criteria', () => {
  const results = assignBoolean(isDoubleDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignBoolean: should work as expected', () => {
  const argvTouch = [{ value: '-h', key: 0, touched: false }]
  const results = assignBoolean(isDashFlag)(argvTouch)('-h', 0)
  expect(results).toEqual({'-h': true})
  expect(argvTouch[0].touched).toEqual(true)
})

// assignEqual

test('assignEqual: returns false already touched', () => {
  const results = assignEqual(isDashFlag)([{ value: '-h', key: 0, touched: true }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignEqual: returns false not match criteria', () => {
  const results = assignEqual(isDoubleDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignEqual: returns false no equal sign', () => {
  const results = assignEqual(isDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignEqual: should work as expected', () => {
  const argvTouch = [{ value: '-h', key: 0, touched: false }]
  const results = assignEqual(isDashFlag)(argvTouch)('-h=example', 0)
  expect(results).toEqual({'-h': 'example'})
  expect(argvTouch[0].touched).toEqual(true)
})

// assignNext

test('assignNext: returns false already touched', () => {
  const results = assignNext(isDashFlag)([{ value: '-h', key: 0, touched: true }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignNext: returns false not match criteria', () => {
  const results = assignNext(isDoubleDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignNext: returns false no next value', () => {
  const results = assignNext(isDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignNext: returns false next value is a flag', () => {
  const results = assignNext(isDashFlag)([
    { value: '-h', key: 0, touched: false },
    { value: '-a', key: 1, touched: false }
  ])('-h', 0)
  expect(results).toEqual(false)
})

test('assignNext: should work as expected', () => {
  const argvTouch = [
    { value: '-h', key: 0, touched: false },
    { value: 'example', key: 1, touched: false }
  ]
  const results = assignNext(isDashFlag)(argvTouch)('-h', 0)
  expect(results).toEqual({'-h': 'example'})
  expect(argvTouch[0].touched).toEqual(true)
  expect(argvTouch[1].touched).toEqual(true)
})

// assignUntil

test('assignUntil: returns false already touched', () => {
  const results = assignUntil(isDashFlag)([{ value: '-h', key: 0, touched: true }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignUntil: returns false not match criteria', () => {
  const results = assignUntil(isDoubleDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignUntil: returns false no next value', () => {
  const results = assignUntil(isDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignUntil: returns false next value is a flag', () => {
  const results = assignUntil(isDashFlag)([
    { value: '-h', key: 0, touched: false },
    { value: '-a', key: 1, touched: false }
  ])('-h', 0)
  expect(results).toEqual(false)
})

test('assignUntil: should work as expected', () => {
  const argvTouch = [
    { value: '-h', key: 0, touched: false },
    { value: 'hello', key: 1, touched: false },
    { value: 'world', key: 2, touched: false }
  ]
  const results = assignUntil(isDashFlag)(argvTouch)('-h', 0)
  expect(results).toEqual({'-h': 'hello world'})
  expect(argvTouch[0].touched).toEqual(true)
  expect(argvTouch[1].touched).toEqual(true)
  expect(argvTouch[2].touched).toEqual(true)
})

// assignSpread

test('assignSpread: returns false already touched', () => {
  const results = assignSpread(isMultiDashFlag)([{ value: '-h', key: 0, touched: true }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignSpread: returns false not match criteria', () => {
  const results = assignSpread(isMultiDashFlag)([{ value: '-h', key: 0, touched: false }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignSpread: should work as expected', () => {
  const argvTouch = [{ value: '-max', key: 0, touched: false }]
  const results = assignSpread(isMultiDashFlag)(argvTouch)('-max', 0)
  expect(results).toEqual([{'-m': true}, {'-a': true}, {'-x': true}])
  expect(argvTouch[0].touched).toEqual(true)
})

// assignNo

test('assignNo: returns false already touched', () => {
  const results = assignNo(isDoubleDashNoFlag)([{ value: '-h', key: 0, touched: true }])('-h', 0)
  expect(results).toEqual(false)
})

test('assignNo: returns false not match criteria', () => {
  expect(assignNo(isDoubleDashNoFlag, '--')([{ value: '-h', key: 0, touched: false }])('-h', 0)).toEqual(false)
  expect(assignNo(isDoubleDashNoFlag, '--')([{ value: '--hello', key: 0, touched: false }])('-hello', 0)).toEqual(false)
  expect(assignNo(isDoubleDashNoFlag, '--')([{ value: '--no-', key: 0, touched: false }])('--no-', 0)).toEqual(false)
})

test('assignNo: should work as expected', () => {
  const argvTouch = [{ value: '--no-color', key: 0, touched: false }]
  const results = assignNo(isDoubleDashNoFlag, '--')(argvTouch)('--no-color', 0)
  expect(results).toEqual({'--color': false})
  expect(argvTouch[0].touched).toEqual(true)
})

// assignRest

test('assignRest: returns false already touched', () => {
  const results = assignRest(isChild, '--')([{ value: '--', key: 0, touched: true }])('--', 0)
  expect(results).toEqual(false)
})

test('assignRest: returns false not match criteria', () => {
  expect(assignRest(isChild, '--')([{ value: '-h', key: 0, touched: false }])('-h', 0)).toEqual(false)
  expect(assignRest(isChild, '--')([{ value: '--hello', key: 0, touched: false }])('-hello', 0)).toEqual(false)
  expect(assignRest(isChild, '--')([{ value: '--no-', key: 0, touched: false }])('--no-', 0)).toEqual(false)
  expect(assignRest(isChild, '--')([{ value: '--', key: 0, touched: false }])('--', 0)).toEqual(false)
})

test('assignRest: should work as expected', () => {
  const argvTouch = [
    { value: 'example', key: 0, touched: false },
    { value: '--', key: 1, touched: false },
    { value: 'hello', key: 2, touched: false },
    { value: 'world', key: 3, touched: false }
  ]
  const results = assignRest(isChild, '--')(argvTouch)('--', 1)
  expect(results).toEqual({'--': 'hello world'})
  expect(argvTouch[0].touched).toEqual(false)
  expect(argvTouch[1].touched).toEqual(true)
  expect(argvTouch[2].touched).toEqual(true)
  expect(argvTouch[3].touched).toEqual(true)
})

// const cases = [
//   {'-h': {'-h': true, '_': []}},
//   {'-max': {'-m': true, '-a': true, '-x': true, '_': []}},
//   {'-max=thomas': {'-m': true, '-a': true, '-x': true, '_': []}},
//   {'dolphin -max': {'-m': true, '-a': true, '-x': true, '_': ['dolphin']}},
//   {'dolphin -max=thomas': {'-m': true, '-a': true, '-x': true, '_': ['dolphin']}},
//   {'dolphin -max thomas': {'-m': true, '-a': true, '-x': true, '_': [['dolphin'], ['thomas']]}},
//   // {'-h=thomas': {'-h': true, '_': []}} // broken
// ]

// test('parseArgv', async () => {
//   return bluebird.map(cases, async (c) => {
//     const argvString = Object.keys(c)[0]
//     const expected = Object.values(c)[0]
//     const argv = await stringArgv(argvString)
//     const results = parseArgv(argv)
//     expect(results).toEqual(expected)
//   })
// })

// import {
//   parseFlagOption,
//   touchObj,
//   Undefined,
//   coerceToString,
//   isGroupedSingleFlag,
//   isFlag,
//   mergeProperties,
//   parseArgv,
//   parseArgvPieceMeal,
//   groupedSingleFlagsSpreadBool
// } from './index'

// test('parseFlags', () => {
//   expect(parseFlagOption('-h,--help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
//   expect(parseFlagOption('-h    --help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
//   expect(parseFlagOption('  -h,    --help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
//   expect(parseFlagOption('  -h --help ')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
// })

// test('touchObj', () => {
//   expect(touchObj(['alpha'])).toEqual([{value: 'alpha', touched: false}])
// })

// test('Undefined', () => {
//   const u = new Undefined()
//   expect(u instanceof Undefined).toEqual(true)
// })

// test('coerceToString', () => {
//   expect(coerceToString(['hello'])).toEqual('hello')
//   expect(coerceToString(['hello', 'thomas'])).toEqual(['hello', 'thomas'])
// })

// test('mergeProperties', () => {
//   expect(mergeProperties([
//     {'--help': true},
//     {'--help': false}
//   ])).toEqual({'--help': [true, false]})
// })

// test('parseArgvPieceMeal: groupedSingleFlagsSpreadBool', async () => {
//   const argv = await stringArgv('dolphin -max=thomas')
//   const results = parseArgvPieceMeal(argv, [groupedSingleFlagsSpreadBool])
//   expect(results).toEqual({'-m': true, '-a': true, '-x': true})
// })

// // const start = '-h'
// // const start = ['-h', 'true']
// // const end = {'h': true}

// // const x = {
// //   keyValue: (key, match) => match(key.match([/^-+/])),
// //   keyReplace: (key) => key.replace(/^-+/, '')
// // }

// // import parseArgv, {groupedSingleFlagsSpread} from '@reggi/help'

// // parseArgv(process.argv, {groupedSingleFlagsSpread})

// // test('parseArgv: single flag', async () => {
// //   const argv = await stringArgv('-h')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '-h': true
// //   })
// // })

// // test('parseArgv: single flag eq value / space after', async () => {
// //   const argv = await stringArgv('-h=thomas example')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '-h': 'thomas',
// //     '_': ['example']
// //   })
// // })

// // test('parseArgv: single flag space value', async () => {
// //   const argv = await stringArgv('-h thomas example')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '-h': 'thomas',
// //     '_': ['example']
// //   })
// // })

// // test('parseArgv: double flag', async () => {
// //   const argv = await stringArgv('--hello')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '--hello': true
// //   })
// // })

// // test('parseArgv: double flag eq value', async () => {
// //   const argv = await stringArgv('--hello=thomas')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '--hello': 'thomas'
// //   })
// // })

// // test('parseArgv: double flag space value', async () => {
// //   const argv = await stringArgv('--hello thomas')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '--hello': 'thomas'
// //   })
// // })

// // test('parseArgv', async () => {
// //   const argv = await stringArgv('a b c --exec npm run start --hello echo hi')
// //   const results = parseArgv(argv, {
// //     flagEqBool: true
// //   })
// //   expect(results).toEqual({
// //     '--exec': true,
// //     '--hello': true,
// //     '_': ['a b c', 'npm run start', 'hi']
// //   })
// // })

// // test('parseArgv', async () => {
// //   const argv = await stringArgv('a b c --exec npm run start --hello echo hi')
// //   const results = parseArgv(argv, {
// //     flagEqUntilNextFlag: true
// //   })
// //   expect(results).toEqual({
// //     '--exec': 'npm run start',
// //     '--hello': 'echo hi',
// //     '_': ['a b c']
// //   })
// // })

// // test('parseArgv', async () => {
// //   const argv = await stringArgv('a b c --exec npm run start --hello echo hi')
// //   const results = parseArgv(argv, {
// //     flagEqFirst: true
// //   })
// //   expect(results).toEqual({
// //     '--exec': 'npm',
// //     '--hello': 'echo',
// //     '_': ['a b c', 'run start', 'hi']
// //   })
// // })

//


// console.log(parseArgv(['-G', '-max', '--cake', 'chocolate', 'walnut', '--', '--meow', 'hello', 'mom', 'love', '--dolphin'], [
// const res = parseArgv(['--hello', '-g'], {modifiers: [
//   modifiers.anyDash.bool
// ]})
// console.log(res)
