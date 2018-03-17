import prettyJson from './index'

test('prettyJson', () => {
  expect(prettyJson({'hello': 'world'})).toBe('{\n  "hello": "world"\n}')
})
