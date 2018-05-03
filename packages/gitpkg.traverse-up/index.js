import {find} from 'lodash'
import path from 'path'
import fs from 'fs-extra'

export const pathType = async (path) => {
  try {
    const lstat = await fs.lstat(path)
    if (lstat.isDirectory()) return 'directory'
    if (lstat.isFile()) return 'file'
    return 'else'
  } catch (e) {
    return false
  }
}

export const traverseUp = async ({findPathPattern, findTypePattren, workingDir, cwd}) => {
  if (workingDir === '/') throw new Error('not found')
  const thisDir = (path.isAbsolute(workingDir)) ? workingDir : path.join(cwd, workingDir)
  const files = await fs.readdir(thisDir)
  const found = find(files, file => file.match(findPathPattern))
  if (found) {
    const foundPath = path.join(thisDir, found)
    const type = await pathType(foundPath)
    if (type && type.match(findTypePattren)) return foundPath
  }
  const nextDir = path.join(thisDir, '..')
  return traverseUp({findPathPattern, findTypePattren, workingDir: nextDir, cwd})
}

export default traverseUp
