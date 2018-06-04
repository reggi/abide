# example of how to change all packages at once 
lerna exec -- "json -I -e \"this.jest.coverageReporters=['json']\" -f ./package.json"
