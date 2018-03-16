import fs from '@reggi/pkg.fs'

export const fileExists = async (filePath) => {
  try {
    const lstat = await fs.lstatAsync(filePath)
    return lstat.isFile()
  } catch (e) {
    return false
  }
}

export default fileExists
