import isGitUrl from 'is-git-url'
import bluebird from 'bluebird'
import uuid from 'uuid/v4'
import path from 'path'
import os from 'os'
import fs from 'fs-extra'
import execa from 'execa'

export const subrepo = async ({
  source,
  workingDir,
  subrepoPath,
  destDir,
  stdio = 'pipe'
}) => {
  const tmpDir = os.tmpdir()
  const id = uuid()
  const fullDestDir = path.join(workingDir, destDir)
  const fullSource = (isGitUrl(source) || path.isAbsolute(source)) ? source : path.join(workingDir, source)
  const baseDir = path.join(tmpDir, 'subrepo-cli', id)
  const sourceDir = path.join(baseDir, 'source')
  const subrepoDir = path.join(baseDir, 'subrepo')
  let error
  try {
    await bluebird.props({
      mkSourceDir: fs.mkdirp(sourceDir),
      mkSubrepoDir: fs.mkdirp(subrepoDir)
    })
    await execa.shell(`git clone ${fullSource} ${sourceDir}`, {cwd: baseDir, stdio})
    await execa.shell(`git remote remove origin`, {cwd: sourceDir, stdio})
    await execa.shell(`git filter-branch --subdirectory-filter ${subrepoPath}`, {cwd: sourceDir, stdio})
    await execa.shell(`git init`, {cwd: subrepoDir, stdio})
    await execa.shell(`git remote add source ${sourceDir}`, {cwd: subrepoDir, stdio})
    await execa.shell(`git fetch source`, {cwd: subrepoDir, stdio})
    await execa.shell(`git merge source/master`, {cwd: subrepoDir, stdio})
    await fs.move(subrepoDir, fullDestDir)
  } catch (e) {
    error = e
  }
  await fs.remove(baseDir)
  if (error) throw error
  return true
}

export default subrepo
