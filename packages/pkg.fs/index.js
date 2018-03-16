import fs from 'fs'
import bluebird from 'bluebird'
bluebird.promisifyAll(fs)

export default fs
