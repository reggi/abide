import stringArgv from './index'

test('stringArgv: flag with equal', async () => {
  const result = await stringArgv('--name=thomas')
  expect(result).toEqual(['--name=thomas'])
})

test('stringArgv: flag with equal with quotes', async () => {
  const result = await stringArgv('--name="thomas reggi"')
  expect(result).toEqual(['--name=thomas reggi'])
})

test('stringArgv: flag with space', async () => {
  const result = await stringArgv('--name thomas')
  expect(result).toEqual(['--name', 'thomas'])
})

test('stringArgv: single flag with space', async () => {
  const result = await stringArgv('-n thomas')
  expect(result).toEqual(['-n', 'thomas'])
})
