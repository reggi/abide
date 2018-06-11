import glob from 'glob'
import bluebird from 'bluebird'
import fs from 'fs-extra'
import traverseUp from '@reggi/gitpkg.traverse-up'
import path from 'path'
import {flatten, get} from 'lodash'

const globAsync = bluebird.promisify(glob)

export const lernaCorePaths = async ({workingDir}) => {
  const configPath = await traverseUp({
    findPathPattern: 'lerna.json',
    findTypePattren: 'file',
    workingDir
  })
  const rootPath = path.dirname(configPath)
  const rootPackagePath = path.join(rootPath, './package.json')
  const binPath = path.join(rootPath, './node_modules/.bin/lerna')
  return {configPath, rootPath, rootPackagePath, binPath}
}

export const lernaPaths = async ({workingDir}) => {
  const {configPath, rootPath, rootPackagePath, binPath} = await lernaCorePaths({workingDir})
  const config = await fs.readJson(configPath)
  if (!get(config, 'packages')) throw new Error('lerna config is missing packages property')
  const packagePaths = await bluebird.map(config.packages, pkg => {
    return globAsync(pkg, {cwd: rootPath, realpath: true})
  })
  const flatPackagePaths = flatten(packagePaths)
  return {configPath, rootPath, rootPackagePath, binPath, config, packagePaths: flatPackagePaths}
}

export default lernaPaths
