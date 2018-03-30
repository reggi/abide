import execa from 'execa'
import {
  parseFlagOption,
  touchObj,
  Undefined,
  coerceToString,
  isGroupedSingleFlag,
  isFlag,
  parseArgvTouchObj
} from './index'

test('parseFlags', () => {
  expect(parseFlagOption('-h,--help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
  expect(parseFlagOption('-h    --help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
  expect(parseFlagOption('  -h,    --help')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
  expect(parseFlagOption('  -h --help ')).toEqual({'flags': ['-h', '--help'], 'optional': false, 'required': false})
})

test('touchObj', () => {
  expect(touchObj(['alpha'])).toEqual([{value: 'alpha', touched: false}])
})

test('Undefined', () => {
  const u = new Undefined()
  expect(u instanceof Undefined).toEqual(true)
})

test('coerceToString', () => {
  expect(coerceToString(['hello'])).toEqual('hello')
  expect(coerceToString(['hello', 'thomas'])).toEqual(['hello', 'thomas'])
})

test('isGroupedSingleFlag', () => {
  expect(isGroupedSingleFlag('--m')).toEqual(false)
  expect(isGroupedSingleFlag('-m')).toEqual(false)
  expect(isGroupedSingleFlag('-max')).toEqual(true)
  expect(isGroupedSingleFlag('--max')).toEqual(false)
  expect(isGroupedSingleFlag(false)).toEqual(false)
})

test('isGroupedSingleFlag', () => {
  expect(isFlag('--m')).toEqual(true)
  expect(isFlag('-m')).toEqual(true)
  expect(isFlag('-max')).toEqual(true)
  expect(isFlag('--max')).toEqual(true)
  expect(isFlag('max')).toEqual(false)
  expect(isFlag(false)).toEqual(false)
})

const stringArgv = async (stringArgv) => {
  const command = 'node -e "console.log(JSON.stringify(process.argv.slice(2)))" index.js'
  const results = await execa('sh', ['-c', `${command} ${stringArgv}`])
  return JSON.parse(results.stdout)
}

test('parseArgvTouchObj', async () => {
  const argv = await stringArgv('--hello --name=thomas')
  const results = parseArgvTouchObj(touchObj(argv))
  expect(results).toEqual([{'--hello': true}, {'--name': 'thomas'}])
})
