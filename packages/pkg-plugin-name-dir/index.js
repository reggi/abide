import {kebabCase} from 'lodash'
import path from 'path'

const name = (type, wd) => {
  const name = path.basename(wd)
  if (type === 'kebab') return kebabCase(name)
  return name
}

export default ({pkg, wd, opt = {}}) => ({
  ...pkg,
  name: name(opt.type, wd)
})
