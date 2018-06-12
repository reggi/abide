import path from 'path'
import fs from 'fs-extra'
import lernaPaths from '@reggi/lerna.paths'
import bluebird from 'bluebird'
import semverSort from 'semver-sort'
import babelMerge from 'babel-merge'
import {get, set, each, map, extend, without, size, includes, last, isEqual, reduce} from 'lodash'

export const lernaPackageContents = async ({packagePaths}) => {
  const paths = await bluebird.map(packagePaths, async packagePath => {
    const packageJsonPath = path.join(packagePath, './package.json')
    try {
      const packageContent = await fs.readJson(packageJsonPath)
      return {[packageJsonPath]: packageContent}
    } catch (e) {
      return false
    }
  })
  return extend.apply(null, without(paths, false))
}

export const lernaDeps = ({packageContents}) => {
  const devDependencies = {}
  const dependencies = {}
  each(packageContents, packageContent => {
    if (packageContent.devDependencies) {
      each(packageContent.devDependencies, (version, devDependency) => {
        if (!get(devDependencies, `["${devDependency}"]`)) set(devDependencies, `["${devDependency}"]`, {})
        if (!get(devDependencies, `["${devDependency}"].["${version}"]`)) set(devDependencies, `["${devDependency}"].["${version}"]`, [])
        devDependencies[devDependency][version].push(packageContent.name)
      })
    }
    if (packageContent.dependencies) {
      each(packageContent.dependencies, (version, devDependency) => {
        if (!get(dependencies, `["${devDependency}"]`)) set(dependencies, `["${devDependency}"]`, {})
        if (!get(dependencies, `["${devDependency}"].["${version}"]`)) set(dependencies, `["${devDependency}"].["${version}"]`, [])
        dependencies[devDependency][version].push(packageContent.name)
      })
    }
  })
  return {dependencies, devDependencies}
}

export const getIsFileSpecifier = (v) => (typeof v === 'string') ? Boolean(v.match(/^file:/g)) : false

export const FixError = (msg, fix) => {
  const e = new Error(msg)
  e.fix = fix
  return e
}

export const lernaDevDepConsistency = ({devDependencies, rootPackageContents}) => {
  const errors = []
  each(devDependencies, (versions, devDep) => {
    const versionsArr = Object.keys(versions)
    const versionsString = semverSort.asc(versionsArr).join(', ')
    const rootDevDepVersion = get(rootPackageContents.devDependencies, devDep)
    const rootDepVersion = get(rootPackageContents.dependencies, devDep)
    const rootDevDepVersionIsFileSpecifier = getIsFileSpecifier(rootDevDepVersion)
    const rootDepVersionIsFileSpecifier = getIsFileSpecifier(rootDepVersion)
    const rootVersion = rootDevDepVersion || rootDepVersion
    const isFileSpecifier = rootDevDepVersionIsFileSpecifier || rootDepVersionIsFileSpecifier
    const isMissingRoot = !rootVersion && !isFileSpecifier
    const isInvalidVersion = !isMissingRoot && !isFileSpecifier && !includes(versionsArr, rootVersion)
    if (size(versionsArr) !== 1) errors.push(new FixError(`packages using multiple versions of the devDep ${devDep} found ${versionsString}`, `here --changeDevDepVersion ${devDep} ${last(versionsArr)}`))
    if (isMissingRoot) errors.push(new FixError(`root is missing devDep ${devDep}`, `npm install ${devDep} --save-dev`))
    if (isInvalidVersion) errors.push(new FixError(`root contains devDep ${devDep} at version ${rootVersion} needs ${versionsString}`, `npm install ${devDep}@${last(versionsArr)} --save-dev`))
  })
  return errors
}

export const lernaDepConsistency = ({dependencies}) => {
  const errors = []
  each(dependencies, (versions, devDep) => {
    const versionsArr = Object.keys(versions)
    const versionsString = versionsArr.join(', ')
    if (size(versionsArr) !== 1) errors.push(new FixError(`packages using multiple versions of the dep ${devDep} found ${versionsString}`, `here --changeDepVersion ${devDep} ${last(versionsArr)}`))
  })
  return errors
}

export const lernaRootBabel = async ({workingDir}) => {
  const {rootPath, packagePaths} = await lernaPaths({workingDir})
  const packageContents = await lernaPackageContents({packagePaths})
  const babelConfigs = map(packageContents, pkg => pkg.babel)
  const babelConfig = reduce(babelConfigs, (acq, item) => babelMerge(acq, item))
  return {babelConfig, rootPath}
}

export const lernaRootBabelComparePure = async ({rootPath, babelConfig}) => {
  const rootPathPackagePath = path.join(rootPath, 'package.json')
  const rootPathPackageContent = await fs.readJson(rootPathPackagePath)
  if (!rootPathPackageContent.babel) throw new Error('no babel config at package root')
  return isEqual(babelConfig, rootPathPackageContent.babel)
}

export const lernaRootBabelCompare = async ({workingDir}) => {
  const {babelConfig, rootPath} = await lernaRootBabel({workingDir})
  const compared = await lernaRootBabelComparePure({rootPath, babelConfig})
  return compared
}

export const lernaDepAudit = async ({workingDir}) => {
  const {rootPackagePath, packagePaths} = await lernaPaths({workingDir})
  const packageContents = await lernaPackageContents({packagePaths})
  const {dependencies, devDependencies} = lernaDeps({packageContents})
  const rootPackageContents = await fs.readJson(rootPackagePath)
  let errors = []
  errors = errors.concat(lernaDevDepConsistency({devDependencies, rootPackageContents}))
  errors = errors.concat(lernaDepConsistency({dependencies}))
  return errors
}
