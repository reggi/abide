import command from '@reggi/command'

export const commandPlusHandler = async ({main, ...p}) => {
  const {stdout, stderr, exit} = p
  try {
    const results = await main(p)
    if (results === true) {
      return exit(0)
    } else if (results === false) {
      return exit(1)
    } else if (typeof results === 'string' || typeof results === 'number') {
      stdout.write(results + '\n')
      return exit(0)
    } else {
      stdout.write(JSON.stringify(results, null, 2) + '\n')
      return exit(0)
    }
  } catch (e) {
    stderr.write(e.message + '\n')
    return exit(1)
  }
}

export const commandPlus = (module, main, _process = process) => {
  return command(module, async (_process) => {
    return commandPlusHandler({main, ..._process})
  }, _process)
}

export default commandPlus
