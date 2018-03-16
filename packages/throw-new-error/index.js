export const throwNewError = (message, ErrorObj = Error) => {
  throw new ErrorObj(message)
}

export default throwNewError
