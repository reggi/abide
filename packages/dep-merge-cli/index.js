#!/usr/bin/env node
import fs from 'fs-extra'
import path from 'path'
import journey from '@reggi/journey'
import fileExists from '@reggi/pkg.file-exists'
import hasFlag from 'has-flag'

const BLOCK = 'temporary-file:deletion-prevention'
const PACKAGE_JSON = 'package.json'
const endsInPackageJson = (path) => path.match(new RegExp(`${PACKAGE_JSON}$`))
const condition = (truthy, newJourney) => (truthy) ? journey(() => newJourney)() : false
const mergeDeps = (packageContent) => ({
  [BLOCK]: BLOCK,
  ...packageContent,
  dependencies: {
    ...packageContent.dependencies,
    ...packageContent.devDependencies
  }
})

export const depMerge = journey(dirPath => [
  () => ({dirPath}),
  ({dirPath}) => ({endsInPackageJson: endsInPackageJson(dirPath)}),
  ({dirPath, endsInPackageJson}) => (endsInPackageJson) ? ({pkgPath: dirPath}) : ({pkgPath: path.join(dirPath, PACKAGE_JSON)}),
  async ({pkgPath}) => ({fileExists: await fileExists(pkgPath)}),
  ({fileExists, pkgPath}) => condition(fileExists, [
    () => ({pkgPath}),
    // create new package.json
    async ({pkgPath}) => ({packageContent: await fs.readJson(pkgPath)}),
    ({packageContent}) => ({newPackageJson: mergeDeps(packageContent)}),
    // move the original package.json
    ({pkgPath}) => ({mvPath: path.join(path.dirname(pkgPath), 'original_package.json')}),
    async ({pkgPath, mvPath}) => ({moveOg: await fs.move(pkgPath, mvPath)}),
    // // write the new package.json
    async ({pkgPath, newPackageJson}) => ({outputJson: await fs.writeFile(pkgPath, JSON.stringify(newPackageJson, null, 2))})
  ])
])

export const unMerge = journey(dirPath => [
  () => ({dirPath}),
  ({dirPath}) => ({endsInPackageJson: endsInPackageJson(dirPath)}),
  ({dirPath, endsInPackageJson}) => (endsInPackageJson) ? ({pkgPath: dirPath}) : ({pkgPath: path.join(dirPath, PACKAGE_JSON)}),
  async ({pkgPath}) => ({newExists: await fileExists(pkgPath)}),
  ({pkgPath}) => ({mvPath: path.join(path.dirname(pkgPath), 'original_package.json')}),
  async ({mvPath}) => ({originalExists: await fileExists(mvPath)}),
  async ({pkgPath}) => ({packageJsonContent: await fs.readJson(pkgPath)}),
  ({packageJsonContent}) => ({worthy: packageJsonContent[BLOCK] && packageJsonContent[BLOCK] === BLOCK}),
  ({newExists, originalExists, worthy, pkgPath, mvPath}) => condition(worthy && newExists && originalExists, [
    () => ({pkgPath, mvPath}),
    async ({pkgPath}) => ({remove: await fs.remove(pkgPath)}),
    async ({pkgPath, mvPath}) => ({moveOg: await fs.move(mvPath, pkgPath)})
  ])
])

if (hasFlag('--unmerge')) {
  unMerge(process.argv.slice(2)[0])
} else {
  depMerge(process.argv.slice(2)[0])
}
