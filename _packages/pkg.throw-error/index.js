export const throwNewError = (message, ErrorObj = Error) => {
  throw new ErrorObj(message)
}

export const throwError = throwNewError

export default throwNewError
