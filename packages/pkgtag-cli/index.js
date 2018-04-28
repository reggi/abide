import semver from 'semver'
import semverSort from 'semver-sort'
import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'
import {includes, chain} from 'lodash'

const pkgtag = async ({direction = 'desc'} = {}) => {
  const workingDir = process.cwd()
  const pkgPath = path.join(workingDir, './package.json')
  const pkg = await fs.readJson(pkgPath)
  const {stdout} = await execa.shell('git tag')
  const tags = stdout.split('\n')
  const pattern = new RegExp(`^${pkg.name}@`)
  const releventTags = chain(tags)
    .filter(tag => tag.match(pattern))
    .map(tag => tag.replace(pattern, ''))
    .thru(semverSort[direction])
    .value()
  if (includes(releventTags, semver.inc(pkg.version, 'patch'))) {
    throw new Error(`prospective next version tag exists already for ${pkg.name}`)
  }
  return releventTags
}

pkgtag()
  .then(console.log)
  .catch(console.log)
