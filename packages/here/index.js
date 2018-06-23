#!/usr/bin/env node
import path from 'path'
import execa from 'execa'
import command from '@reggi/command'

export default command(module, async ({argv, cwd, exit, stderr}) => {
  const shellScript = path.join(__dirname, 'index.sh')
  const workingDir = cwd()
  const passArgv = argv.slice(2).join(' ')
  const cmd = `bash ${shellScript} ${passArgv}`
  try {
    const {code} = await execa.shell(cmd, {cwd: workingDir, stdio: 'inherit'})
    return exit(code)
  } catch (e) {
    stderr.write(e.message + '\n')
    return exit(1)
  }
})
