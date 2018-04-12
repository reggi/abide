export const pattern = /^.\.\/|^.\/|^\//
export const moduleIsLocal = (str) => Boolean(str.match(pattern))
export default moduleIsLocal
