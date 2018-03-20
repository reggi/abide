import pluginSort from './index'

test('pluginSort', () => {
  const pkg = {
    'version': '1.0.0',
    'name': 'hello-world'
  }
  const result = pluginSort({pkg})
  expect(JSON.stringify(pkg)).not.toEqual('{"name":"hello-world","version":"1.0.0"}')
  expect(JSON.stringify(result)).toEqual('{"name":"hello-world","version":"1.0.0"}')
})
