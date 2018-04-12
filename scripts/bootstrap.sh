npm i lerna
npm i ./packages/dep-merge-cli
./node_modules/.bin/lerna exec -- ../../node_modules/.bin/dep-merge ./
npm i
./node_modules/.bin/lerna exec -- ../../node_modules/.bin/dep-merge ./ --unmerge
