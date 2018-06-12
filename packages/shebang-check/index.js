import fs from 'fs-extra'
import path from 'path'
import {isString, isPlainObject, values, map, uniq} from 'lodash'
import journey from '@reggi/journey'
import shebangRegex from 'shebang-regex'
import bluebird from 'bluebird'

export const coerceBin = (pkgContent) => {
  if (!pkgContent.bin) return []
  if (isString(pkgContent.bin)) return [pkgContent.bin]
  if (isPlainObject(pkgContent.bin)) return values(pkgContent.bin)
  throw new Error('invalid package bin')
}

export const fullBinFilePaths = ({workingDir, binFiles}) => map(binFiles, binFile => path.join(workingDir, binFile))
export const binFileContent = (fullBinFilePath) => fs.readFile(fullBinFilePath, 'utf8')
export const validateAllFiles = (files) => map(files, file => shebangRegex.test(file))
export const verifyFiles = (uniqueResults) => {
  if (!uniqueResults.length) return null
  if ((uniqueResults.length === 1 && uniqueResults[0])) return true
  return false
}

export const shebangCheck = journey(({workingDir}) => [
  () => ({workingDir}),
  ({workingDir}) => ({pkgPath: path.join(workingDir, 'package.json')}),
  async ({pkgPath}) => ({pkgContent: await fs.readJson(pkgPath)}),
  ({pkgContent}) => ({binFiles: coerceBin(pkgContent)}),
  ({binFiles}) => ({fullBinFilePaths: fullBinFilePaths({workingDir, binFiles})}),
  async ({fullBinFilePaths}) => ({fileContents: await bluebird.map(fullBinFilePaths, binFileContent)}),
  ({fileContents}) => ({validateAllFiles: validateAllFiles(fileContents)}),
  ({validateAllFiles}) => ({uniqValidateAllFiles: uniq(validateAllFiles)}),
  ({uniqValidateAllFiles}) => ({verifyFiles: verifyFiles(uniqValidateAllFiles)})
], {return: 'verifyFiles'})

export default shebangCheck
