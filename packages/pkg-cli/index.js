import pkg from '@reggi/pkg'

const workingDir = process.cwd()
pkg({workingDir})
  .then(console.log)
  .catch(console.log)
