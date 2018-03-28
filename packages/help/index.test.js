import {
  parseFlagOption
} from './index'

test('parseFlags', () => {
  expect(parseFlagOption('-h,--help')).toEqual(['-h', '--help'])
  expect(parseFlagOption('-h,    --help')).toEqual(['-h', '--help'])
  expect(parseFlagOption('  -h,    --help')).toEqual(['-h', '--help'])
  expect(parseFlagOption('  --help,    -h  ')).toEqual(['--help', '-h'])
})
