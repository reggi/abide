import deepmerge from 'deepmerge'
import coerceToArray from '@reggi/journey.coerce-to-array'
import setEntire from '@reggi/help.set-entire'
import inquirer from 'inquirer'
import {pickBy, get} from 'lodash'
import fs from 'fs-extra'
import path from 'path'

export const pkgprop = async ({props, prop, packagePath = './package.json', workingDir = ''}) => {
  const fullProps = coerceToArray(prop || props)
  const fullPackagePath = (path.isAbsolute(packagePath)) ? packagePath : path.join(workingDir, packagePath)
  const packageContents = await fs.readJson(fullPackagePath, 'utf8')
  const name = get(packageContents, 'name', 'MISSINGPKGNAME')
  const questionMessage = (name, prop, packageContents) => `${name} - assign "${prop}"${(get(packageContents, prop)) ? ` (${get(packageContents, prop)})` : ''}`
  const questions = fullProps.map(prop => ({type: 'input', name: prop, message: questionMessage(name, prop, packageContents)}))
  const results = await inquirer.prompt(questions)
  const filterEmptyResults = pickBy(results, result => result !== '')
  const newProps = setEntire(filterEmptyResults)
  const newPackage = deepmerge(packageContents, newProps)
  await fs.writeFile(fullPackagePath, JSON.stringify(newPackage, null, 2))
  return true
}

export default pkgprop
