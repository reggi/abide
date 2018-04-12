import path from 'path'
import {journey} from '@reggi/journey'
import fsExistsAsFile from '@reggi/pkg.file-exists'
import fs from '@reggi/pkg.fs'
import throwNewError from '@reggi/pkg.throw-error'
import jsonParseForgive from '@reggi/pkg.json-parse'

export const readJson = journey(({workingDir, fileName, existsRequired = false, validJsonRequired = false}) => [
  () => ({workingDir, fileName, existsRequired, validJsonRequired}),
  ({workingDir, fileName}) => ({filePath: path.join(workingDir, fileName)}),
  async ({filePath}) => ({fileExists: await fsExistsAsFile(filePath)}),
  async ({fileName, fileExists, existsRequired}) => !fileExists && existsRequired && throwNewError(`missing ${fileName} file in ${workingDir}`),
  async ({filePath, fileExists}) => ({fileContent: (fileExists) ? await fs.readFileAsync(filePath, 'utf8') : false}),
  ({fileContent, validJsonRequired}) => ({fileJson: (fileContent && validJsonRequired) ? JSON.parse(fileContent) : jsonParseForgive(fileContent)})
], {return: 'fileJson'})

export default readJson
