import bluebird from 'bluebird'
import path from 'path'
import {isArray, flattenDeep} from 'lodash'
import journey from '@reggi/journey'
import coerceToArray from '@reggi/journey.coerce-to-array'
import isLocalModule from '@reggi/pkg.is-local-module'
import readJson from '@reggi/pkg.read-json'
import prettyJson from '@reggi/pkg.pretty-json'
import fs from '@reggi/pkg.fs'

export const existsRequired = true
export const validJsonRequired = true

export const resolvePlugins = (workingDir, plugins) => {
  return plugins.map((plugin) => {
    plugin = coerceToArray(plugin)
    const mod = plugin[0]
    const opt = (plugin.length === 1) ? false : plugin[1]
    let modPath = false
    let fn = false
    if (typeof mod !== 'function') {
      modPath = (isLocalModule(mod) && !mod.match('^/')) ? path.join(workingDir, mod) : mod
      const rawRequire = require(modPath)
      fn = rawRequire.default || rawRequire
      if (isArray(fn)) return resolvePlugins(workingDir, fn)
    } else {
      fn = mod
    }
    return {mod, opt, modPath, fn}
  })
}

export const mapPlugins = (workingDir, plugins) => flattenDeep(resolvePlugins(workingDir, plugins))

export const pkgrc = journey(({workingDir, write, plugin, stdout, argv}) => [
  () => ({workingDir, write, stdout, plugin, argv}),
  ({plugin}) => ({pkgrcRequired: !plugin}),
  async ({workingDir, pkgrcRequired}) => bluebird.props({
    pkgrc: readJson({workingDir, fileName: '.pkgrc', existsRequired: pkgrcRequired, validJsonRequired: pkgrcRequired}),
    pkg: readJson({workingDir, fileName: 'package.json', validJsonRequired})
  }),
  ({pkgrc, argv}) => (
    (plugin) ? {plugins: mapPlugins(workingDir, [argv.plugin])} : {plugins: mapPlugins(workingDir, pkgrc)}
  ),
  async ({pkgrc, plugins, pkg, argv}) => ({model: await bluebird.reduce(plugins, (acq, {fn, opt, mod, modPath}) => {
    return fn({pkgrc, pkg: acq, workingDir, wd: workingDir, opt, mod, modPath, argv})
  }, pkg || {})}),
  ({model}) => ({writeFileContent: prettyJson(model)}),
  ({workingDir}) => ({writeFilePath: path.join(workingDir, 'package.json')}),
  async ({write, writeFilePath, writeFileContent}) => (write) ? ({writeFileResult: await fs.writeFileAsync(writeFilePath, writeFileContent)}) : {},
  ({stdout, writeFileContent}) => (stdout) ? ({stoutResult: process.stdout.write(writeFileContent + '\n')}) : {}
], {return: 'newContent'})

export default pkgrc
