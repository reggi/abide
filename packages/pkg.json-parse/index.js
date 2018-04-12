export const jsonParseForgive = (content) => {
  try {
    return JSON.parse(content)
  } catch (e) {
    return false
  }
}

export default jsonParseForgive
