import {isPlainObject} from 'lodash'
export const coerceToPlainObject = (v) => isPlainObject(v) ? v : {}
export default coerceToPlainObject
