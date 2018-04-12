import mock from 'mock-fs'
import fileExists from './index'

beforeEach(async () => {
  mock({
    'dir': {
      'exists.txt': 'hello world',
      'empty-dir': {/** empty directory */}
    }
  })
})

afterEach(async () => {
  mock.restore()
})

test('fileExists: yes', async () => expect(await fileExists('dir/exists.txt')).toEqual(true))
test('fileExists: no', async () => expect(await fileExists('dir/not-exists.txt')).toEqual(false))
test('fileExists: is dir, no', async () => expect(await fileExists('dir/empty-dir')).toEqual(false))
