import bluebird from 'bluebird'
import fs from 'fs-extra'
import traverseUp from '@reggi/gitpkg.traverse-up'
import path from 'path'
import execa from 'execa'
import {map, extend, without} from 'lodash'

export const lernaPaths = async ({workingDir}) => {
  const config = await traverseUp({
    findPathPattern: 'lerna.json',
    findTypePattren: 'file',
    workingDir
  })
  const root = path.dirname(config)
  const bin = path.join(root, './node_modules/.bin/lerna')
  return {bin, config, root}
}

export const lernaUpdated = async ({lernaBinPath}) => {
  try {
    const {stdout} = await execa.shell(`${lernaBinPath} updated --json`, {cwd: __dirname})
    const updatedParsed = JSON.parse(stdout)
    return updatedParsed
  } catch (e) {
    return []
  }
}

export const packagePaths = async ({packagesDir}) => {
  const packages = await fs.readdir(packagesDir)
  const paths = await bluebird.map(packages, async pkg => {
    const packageDir = path.join(packagesDir, pkg)
    const packageJsonPath = path.join(packageDir, './package.json')
    try {
      const packageContent = await fs.readJson(packageJsonPath)
      return {[packageContent.name]: packageDir}
    } catch (e) {
      return false
    }
  })
  return extend.apply(null, without(paths, false))
}

export const updatedPaths = async ({workingDir, packagesDir = './packages'}) => {
  const lerna = await lernaPaths({workingDir})
  const fullPackagesDir = path.join(lerna.root, packagesDir)
  const {updated, paths} = await bluebird.props({
    updated: lernaUpdated({lernaBinPath: lerna.bin}),
    paths: packagePaths({packagesDir: fullPackagesDir})
  })
  const execPaths = without(map(updated, updatedPackage => paths[updatedPackage.name] || false), false)
  return execPaths
}
