import path from 'path'
import {set} from 'lodash'
import fs from 'fs-extra'

export async function propertyFile ({prop, filePath, pkgPath}) {
  const pkg = await fs.readJson(path.join(process.cwd(), pkgPath))
  const file = await fs.readJson(path.join(process.cwd(), filePath))
  const newPkg = set(pkg, prop, file)
  const writeOperation = await fs.writeFile(pkgPath, JSON.stringify(newPkg, null, 2) + '\n')
  return {pkg, file, newPkg, writeOperation}
}

export default propertyFile

propertyFile({
  prop: 'babel',
  filePath: '../../keyq.json',
  pkgPath: './package.json'
})

// cli pkg.property-file --prop babel --filePath ../keyq.json --pkgPath ./package.json
// "COMPOSITION"
// "CAPSULE"
