import {set, each} from 'lodash'

export const setEntire = (obj) => {
  const newObj = {}
  each(obj, (value, key) => {
    set(newObj, key, value)
  })
  return newObj
}

export default setEntire
