import path from 'path'
import {find} from 'lodash'
import pMap from 'p-map'
import traverseUp from '@reggi/gitpkg.traverse-up'
import fs from 'fs-extra'
import Lerna from '@lerna/project'
import collectPackages from '@lerna/collect-packages'
import PackageGraph from '@lerna/package-graph'
import collectUpdates from '@lerna/collect-updates'
import log from 'npmlog'

export const lernaConfig = async ({workingDir}) => {
  const traverseUpDefaults = {findPathPattern: 'lerna.json', findTypePattren: 'file'}
  const config = await traverseUp({...traverseUpDefaults, workingDir})
  return config
}

export const lernaPackages = async ({config}) => {
  const lerna = new Lerna(config)
  const {rootPath, packageConfigs} = lerna
  const packages = await collectPackages(rootPath, packageConfigs)
  const packageGraph = new PackageGraph(packages)
  const logger = log.newGroup('depPointer')
  const execOpts = {cwd: rootPath}
  const options = {'forcePublish': '*'}
  const updates = collectUpdates({
    filteredPackages: packages,
    packageGraph,
    rootPath,
    options,
    logger,
    execOpts
  })
  return {updates, packageGraph}
}

export const packageJsonInWorkingDir = async ({workingDir}) => {
  const packagePath = path.join(workingDir, 'package.json')
  try {
    const packageContent = await fs.readJson(packagePath)
    const packageName = packageContent.name
    return packageName
  } catch (e) {
    return false
  }
}

// changes the version / file and saves the file
const updateLocalDependency = ({packageGraph, savePrefix, fullPkg}) => {
  const {pkg, localDependencies} = fullPkg
  for (const [depName, resolved] of localDependencies) {
    const depVersion = packageGraph.get(depName).pkg.version
    pkg.updateLocalDependency(resolved, depVersion, savePrefix)
  }
  return pkg.serialize()
}

export const createPackageLocal = ({pkg}) => {
  return fs.writeJson(path.join(pkg.location, 'package-local.json'), pkg.toJSON(), {spaces: 2})
}

export const packageHandler = async ({updates, packageName}, callback) => {
  if (packageName) {
    const fullPkg = find(updates, ({pkg}) => pkg.name === packageName)
    await callback(fullPkg)
  } else {
    await pMap(updates, async (fullPkg) => {
      await callback(fullPkg)
    })
  }
}

export const depPointer = async ({workingDir, savePrefix = '', all, packageName, backupLocal = true, useLocal = false}) => {
  if (!all && !packageName) packageName = await packageJsonInWorkingDir({workingDir})
  if (!all && !packageName) throw new Error('nothing specific to change')
  const config = await lernaConfig({workingDir})
  const {updates, packageGraph} = await lernaPackages({config, forcePublish: (all || packageName)})
  if (useLocal) {
    await packageHandler({updates, packageName}, async ({pkg}) => {
      const packageLocalPath = path.join(pkg.location, 'package-local.json')
      try {
        const pkgLocal = await fs.readJson(packageLocalPath)
        await fs.writeJson(path.join(pkg.location, 'package.json'), pkgLocal, {spaces: 2})
        await fs.remove(packageLocalPath)
      } catch (e) {
        throw new Error('no package local file available')
      }
    })
  } else {
    await packageHandler({updates, packageName}, async (fullPkg) => {
      if (backupLocal) await createPackageLocal(fullPkg)
      await updateLocalDependency({packageGraph, savePrefix, fullPkg})
    })
  }
  return true
}

export default depPointer
