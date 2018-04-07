import execa from 'execa'
import minimist from 'minimist'
import {
  isDashFlag,
  isOnlyDashFlag,
  isMulitDashFlag,
  isDoubleDashFlag
} from './index'

const stringArgv = async (stringArgv) => {
  const command = 'node -e "console.log(JSON.stringify(process.argv.slice(2)))" index.js'
  const results = await execa('sh', ['-c', `${command} ${stringArgv}`])
  return JSON.parse(results.stdout)
}

test('minimsit', async () => {
  const argv = await stringArgv('-max')
  const results = minimist(argv)
  expect(results).toEqual({ _: [], m: true, a: true, x: true })
})

test('isOnlyDashFlag', async () => {
  expect(isOnlyDashFlag('-m')).toBeTruthy()
  expect(isOnlyDashFlag('-m=thomas')).toBeTruthy()
  expect(isOnlyDashFlag('-max')).toBeFalsy()
  expect(isOnlyDashFlag('--max')).toBeFalsy()
  expect(isOnlyDashFlag('--max=-m')).toBeFalsy()
})

test('isDashFlag', async () => {
  expect(isDashFlag('-m')).toBeTruthy()
  expect(isDashFlag('-m=thomas')).toBeTruthy()
  expect(isDashFlag('-max')).toBeTruthy()
  expect(isDashFlag('--max')).toBeFalsy()
  expect(isDashFlag('--max=-m')).toBeFalsy()
})

test('isMulitDashFlag', async () => {
  expect(isMulitDashFlag('-m')).toBeFalsy()
  expect(isMulitDashFlag('-m=thomas')).toBeFalsy()
  expect(isMulitDashFlag('-max')).toBeTruthy()
  expect(isMulitDashFlag('--max')).toBeFalsy()
  expect(isMulitDashFlag('--max=-m')).toBeFalsy()
})

test('isDoubleDashFlag', async () => {
  expect(isDoubleDashFlag('-m')).toBeFalsy()
  expect(isDoubleDashFlag('-m=thomas')).toBeFalsy()
  expect(isDoubleDashFlag('-max')).toBeFalsy()
  expect(isDoubleDashFlag('--max')).toBeTruthy()
  expect(isDoubleDashFlag('--max=-m')).toBeTruthy()
})

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

// test('isGroupedSingleFlag', () => {
//   expect(isGroupedSingleFlag('--m')).toEqual(false)
//   expect(isGroupedSingleFlag('-m')).toEqual(false)
//   expect(isGroupedSingleFlag('-max')).toEqual(true)
//   expect(isGroupedSingleFlag('--max')).toEqual(false)
//   expect(isGroupedSingleFlag(false)).toEqual(false)
// })

// test('isFlag', () => {
//   expect(isFlag('--m')).toEqual(true)
//   expect(isFlag('-m')).toEqual(true)
//   expect(isFlag('-max')).toEqual(true)
//   expect(isFlag('--max')).toEqual(true)
//   expect(isFlag('max')).toEqual(false)
//   expect(isFlag(false)).toEqual(false)
// })



// test('mergeProperties', () => {
//   expect(mergeProperties([
//     {'--help': true},
//     {'--help': false}
//   ])).toEqual({'--help': [true, false]})
// })

// test('parseArgvPieceMeal', async () => {
//   const argv = await stringArgv('-max')
//   const results = parseArgvPieceMeal(argv)
//   expect(results).toEqual({})
// })

// test('parseArgvPieceMeal: groupedSingleFlagsSpreadBool', async () => {
//   const argv = await stringArgv('-max')
//   const results = parseArgvPieceMeal(argv, [groupedSingleFlagsSpreadBool])
//   expect(results).toEqual({'-m': true, '-a': true, '-x': true})
// })

// test('parseArgvPieceMeal: groupedSingleFlagsSpreadBool', async () => {
//   const argv = await stringArgv('-max=thomas')
//   const results = parseArgvPieceMeal(argv, [groupedSingleFlagsSpreadBool])
//   expect(results).toEqual({'-m': true, '-a': true, '-x': true})
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

// // test('parseArgv: single flag eq value', async () => {
// //   const argv = await stringArgv('-h=thomas')
// //   const results = parseArgv(argv)
// //   expect(results).toEqual({
// //     '-h': 'thomas'
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
