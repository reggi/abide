import {kebabCase} from 'lodash'
import path from 'path'

const name = (opt, wd) => {
  const name = path.basename(wd)
  if (opt.kebab) return kebabCase(name)
  return name
}

export default ({pkg = {}, opt = {}, wd}) => ({
  ...pkg,
  name: name(opt, wd)
})
