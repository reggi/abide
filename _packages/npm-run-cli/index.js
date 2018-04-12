#!/usr/bin/env node
import path from 'path'
import {spawnSync} from 'child_process'
import {get} from 'lodash'
import journey from '@reggi/journey'
import readJson from '@reggi/pkg.read-json'
import throwError from '@reggi/pkg.throw-error'

export const findScript = journey((script, workingDir) => [
  () => ({script, workingDir}),
  ({workingDir}) => (workingDir === '/') ? throwError('no script found') : {},
  async ({workingDir}) => ({readJson: await readJson({workingDir, fileName: 'package.json'})}),
  ({script, readJson}) => ({scriptFound: get(readJson, `scripts.${script}`)}),
  async ({scriptFound}) => (!scriptFound) ? {scriptDir: await findScript(script, path.dirname(workingDir))} : {scriptDir: workingDir}
], {return: 'scriptDir'})

export const runScript = async () => {
  const script = process.argv.slice(2)[0]
  const cwd = process.cwd()
  const scriptDir = await findScript(script, cwd)
  return spawnSync('sh', ['-c', `npm run --prefix ${scriptDir} ${script}`], {stdio: 'inherit'})
}

runScript().then()
