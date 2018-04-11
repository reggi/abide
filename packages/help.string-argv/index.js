import execa from 'execa'

export const stringArgv = async (stringArgv) => {
  const command = 'node -e "console.log(JSON.stringify(process.argv.slice(2)))" index.js'
  const results = await execa('sh', ['-c', `${command} ${stringArgv}`])
  return JSON.parse(results.stdout)
}

export default stringArgv
