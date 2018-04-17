import os from 'os'
import path from 'path'
import {journey} from '@reggi/journey'
import throwError from '@reggi/pkg.throw-error'
import execa from 'execa'
import fs from 'fs-extra'
import uuid from 'uuid'
import debug from 'debug'

const hook = (journeyName) => (acq, res) => debug(`requireable:${journeyName}`)(JSON.stringify(res))
const isFile = async (p) => fs.lstat(p).then(stat => stat.isFile()).catch(() => false)
const isDir = (p) => fs.lstat(p).then(stat => stat.isDirectory()).catch(() => false)

const tmpPkgTemplate = {
  'name': 'requireable-temp',
  'version': '1.0.0',
  'description': 'This is a temporary package.json to test',
  'repository': 'https://github.com/nodejs/node',
  'main': 'index.js',
  'scripts': {
    'test': 'echo \'Error: no test specified\' && exit 1'
  },
  'keywords': [],
  'author': '',
  'license': 'ISC'
}

const npmInstall = ({absoluteModPath, tmpFullDir}) => execa('npm', ['install', absoluteModPath], {cwd: tmpFullDir, stdio: 'inherit'})
const requireModule = ({nodeBin = 'node', modPkgJson, tmpFullDir}) => execa.shell(`${nodeBin} -e "require('${modPkgJson.name}');console.log('require successfull')"`, {cwd: tmpFullDir, stdio: 'inherit'})

export const requireableCore = journey(({modPath, tmpFullDir, nodeBin, inherit}) => [
  () => ({modPath, tmpFullDir}),
  ({inherit}) => ({stdio: (inherit) ? 'inherit' : 'pipe'}),
  // checks if the modPath is a directory
  async ({modPath}) => ({modPathIsDir: isDir(modPath)}),
  // throws an error if it is invalid dir
  ({modPathIsDir}) => (!modPathIsDir) ? throwError('module path is not a directory') : false,
  // declares the path of the modPath's package.json file
  ({modPath}) => ({modPkgPath: path.join(modPath, 'package.json')}),
  // checks if the modPath has a package.json in it
  async ({modPkgPath}) => ({modPkgPathIsFile: isFile(modPkgPath)}),
  // throws an error if the expected modPath package.json is not valid
  ({modPkgPathIsFile}) => (!modPkgPathIsFile) ? throwError('module path missing package.json') : false,
  // get the package.json
  async ({modPkgPath}) => ({modPkgJson: await fs.readJson(modPkgPath)}),
  // declares the path of the temp package.json file
  ({tmpFullDir}) => ({tmpFullDirPkg: path.join(tmpFullDir, 'package.json')}),
  // creates a the temp package.json file
  async ({tmpFullDirPkg}) => ({resultWritePkg: await fs.writeJson(tmpFullDirPkg, tmpPkgTemplate)}),
  // creates an absolute path for the module (to install anywhere on machine)
  ({modPath}) => ({absoluteModPath: path.resolve(modPath)}),
  // attempts to install the module with the cwd set to the temp dir
  async ({absoluteModPath, tmpFullDir, stdio}) => ({resultNpmInstall: await npmInstall({absoluteModPath, tmpFullDir, stdio})}),
  // attemps to require the install module and will throw error if fails
  async ({modPkgJson, stdio}) => ({resultRequireMod: await requireModule({nodeBin, modPkgJson, tmpFullDir, stdio})}),
  // add success to object
  () => ({success: true})
], {hook: hook('requireableCore')})

export const requireableCoreWrapped = ({modPath, tmpFullDir}) => {
  try {
    return requireableCore(({modPath, tmpFullDir}))
  } catch (e) {
    return {success: false, ...e}
  }
}

export const requireable = journey(({modPath, nodeBin, inherit}) => [
  () => ({modPath}),
  // gets the temp dir
  () => ({tmpDir: os.tmpdir()}),
  // generates uuid
  () => ({uuid: uuid()}),
  // full expected dir path
  ({tmpDir, uuid}) => ({tmpFullDir: path.join(tmpDir, 'requireable-cli', uuid)}),
  // ensures dirpath exists (mkdirp)
  async ({tmpFullDir}) => ({resultEnsureDir: await fs.ensureDir(tmpFullDir)}),
  // runs core code (catches errors)
  async ({modPath, tmpFullDir}) => ({core: await requireableCoreWrapped({modPath, tmpFullDir, nodeBin, inherit})}),
  // should run this even if there are errors
  async ({tmpFullDir}) => ({resultClean: await fs.remove(tmpFullDir)})
  // returns core
], {return: 'core', hook: hook('requireable')})

export default requireable
