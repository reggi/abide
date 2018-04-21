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
  assignRest,
  modifiers,
  touchObj,
  coerceToString,
  applySpecifier,
  applyModifiers,
  groupByIncProp,
  untouched,
  mergeProperties
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

// touchObj

test('touchObj', () => {
  const result = touchObj(['hello'])
  expect(result).toEqual([{'key': 0, 'touched': false, 'value': 'hello'}])
})

// coerceToString

test('coerceToString', () => {
  expect(coerceToString(['hello'])).toEqual('hello')
  expect(coerceToString(['a', 'b'])).toEqual(['a', 'b'])
})

// applySpecifier

test('applySpecifier: empty args', () => {
  const result = applySpecifier()
  expect(result).toEqual([])
})

test('applySpecifier: should world', () => {
  const specifiers = {'--example': modifiers.doubleDash.bool}
  const argv = ['--example']
  const argvTouch = [{ value: '--example', key: 0, touched: false }]
  const result = applySpecifier(specifiers, argv, argvTouch)
  expect(argvTouch[0].touched).toEqual(true)
  expect(result).toEqual([[{'--example': true}]])
})

test('applySpecifier: should return nothing', () => {
  const specifiers = {'--example': modifiers.doubleDash.bool}
  const argv = ['./index.js']
  const argvTouch = [{ value: './index.js', key: 0, touched: false }]
  const result = applySpecifier(specifiers, argv, argvTouch)
  expect(argvTouch[0].touched).toEqual(false)
  expect(result).toEqual([[]])
})

test('applyModifiers: empty args', () => {
  const result = applyModifiers()
  expect(result).toEqual([])
})

test('applyModifiers: should world', () => {
  const fns = [modifiers.anyDash.bool]
  const argv = ['--example']
  const argvTouch = [{ value: '--example', key: 0, touched: false }]
  const result = applyModifiers(fns, argv, argvTouch)
  expect(argvTouch[0].touched).toEqual(true)
  expect(result).toEqual([{'--example': true}])
})

// groupByIncProp

test('groupByIncProp', () => {
  const value = [{key: 1}, {key: 2}, {key: 3}, {key: 15}, {key: 16}, {key: 21}]
  expect(groupByIncProp(value)).toEqual([
    [{key: 1}, {key: 2}, {key: 3}],
    [{key: 15}, {key: 16}],
    [{key: 21}]
  ])
})

// untouched

test('untouched', () => {
  const argvTouch = [
    { value: 'example', key: 0, touched: false },
    { value: '--', key: 1, touched: true },
    { value: 'hello', key: 2, touched: false },
    { value: 'world', key: 3, touched: true }
  ]
  expect(untouched(argvTouch)).toEqual([['example'], ['hello']])
})

// mergeProperties

test('mergeProperties', () => {
  const results = mergeProperties([
    {'--a': 'a'},
    {'--a': 'b'},
    {'--example': 'thomas'}
  ])
  expect(results).toEqual({
    '--a': ['a', 'b'],
    '--example': 'thomas'
  })
})

const cases = [
  {'-h': {'-h': true, '_': []}},
  {'-max': {'-m': true, '-a': true, '-x': true, '_': []}},
  {'-max=thomas': {'-m': true, '-a': true, '-x': true, '_': []}},
  {'dolphin -max': {'-m': true, '-a': true, '-x': true, '_': ['dolphin']}},
  {'dolphin -max=thomas': {'-m': true, '-a': true, '-x': true, '_': ['dolphin']}},
  {'dolphin -max thomas': {'-m': true, '-a': true, '-x': true, '_': [['dolphin'], ['thomas']]}},
  {'-h=thomas': {'-h': true, '_': []}},
  {'-- echo "hello world"': {'_': [], '--': 'echo hello world'}},
  {'--example -- echo "hello world"': {'--example': true, '_': [], '--': 'echo hello world'}},
  {'-cpde -- echo "hello world"': {'-c': true, '-p': true, '-d': true, '-e': true, '--': 'echo hello world', _: []}}
]

test('parseArgv', async () => {
  return bluebird.map(cases, async (c) => {
    const argvString = Object.keys(c)[0]
    const expected = Object.values(c)[0]
    const argv = await stringArgv(argvString)
    const results = parseArgv(argv)
    expect(results).toEqual(expected)
  })
})

test('parseArgv: with specifier', async () => {
  return bluebird.map(cases, async (c) => {
    const argv = await stringArgv('-h')
    const results = parseArgv(argv, {
      modifiers: false,
      specifiers: {'-h': modifiers.anyDash.bool}
    })
    expect(results).toEqual({'-h': true, '_': []})
  })
})
