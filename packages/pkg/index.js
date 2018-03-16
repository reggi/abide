import bluebird from 'bluebird'
import path from 'path'
import {isArray, flattenDeep} from 'lodash'
import journey from '@reggi/journey'
import coerceToArray from '@reggi/journey.coerce-to-array'
import isLocalModule from '@reggi/pkg.is-local-module'
import readJson from '@reggi/pkg.read-json'

export const existsRequired = true
export const validJsonRequired = true

export const resolvePlugins = (workingDir, plugins) => {
  return plugins.map((plugin) => {
    plugin = coerceToArray(plugin)
    const mod = plugin[0]
    const opt = (plugin.length === 1) ? false : plugin[1]
    const modPath = (isLocalModule(mod) && !mod.match('^/')) ? path.join(workingDir, mod) : mod
    const rawRequire = require(modPath)
    const fn = rawRequire.default || rawRequire
    if (isArray(fn)) return resolvePlugins(workingDir, fn)
    return {mod, opt, modPath, fn}
  })
}

export const mapPlugins = (workingDir, plugins) => flattenDeep(resolvePlugins(workingDir, plugins))

export const pkgrc = journey(({workingDir}) => [
  () => ({workingDir}),
  async ({workingDir}) => bluebird.props({
    pkgrc: readJson({workingDir, fileName: '.pkgrc', existsRequired, validJsonRequired}),
    pkg: readJson({workingDir, fileName: 'package.json', validJsonRequired})
  }),
  ({pkgrc}) => ({plugins: mapPlugins(workingDir, pkgrc)}),
  async ({pkgrc, plugins, pkg}) => ({model: await bluebird.reduce(plugins, (acq, {fn, opt, mod, modPath}) => {
    return fn({pkgrc, pkg: acq, workingDir, wd: workingDir, opt, mod, modPath})
  }, pkg || {})}),
  ({model}) => ({newContent: JSON.stringify(model, null, 2)})
], {return: 'newContent'})

export default pkgrc
