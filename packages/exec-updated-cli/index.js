import traverseUp from '@reggi/gitpkg.traverse-up'
import path from 'path'
import execa from 'execa'
import 'lerna'

export const execUpdated = async ({workingDir}) => {
  const lernaConfigPath = await traverseUp({
    findPathPattern: 'lerna.json',
    findTypePattren: 'file',
    workingDir
  })
  const lernaPath = path.join(path.dirname(lernaConfigPath), './node_modules/.bin/lerna')
  let updatedJson
  try {
    updatedJson = await execa.shell(`${lernaPath} updated --json`, {cwd: __dirname})
    return updatedJson
  } catch (e) {
    console.log(e)
    return []
  }
}

export default execUpdated

execUpdated({workingDir: process.cwd()})
  .then(console.log)
  .catch(console.log)
