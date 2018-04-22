results='./node_modules/.bin/results'
echo 'Testing "housekeeping" suite...'
results -c -- npm --prefix ./packages/command run test
results -c -- npm --prefix ./packages/dep-merge run test
results -c -- npm --prefix ./packages/dep-merge-cli run test
echo 'Testing "help" suite...'
results -c -- npm --prefix ./packages/help run test
results -c -- npm --prefix ./packages/help.filter-until run test
results -c -- npm --prefix ./packages/help.parse-argv run test
results -c -- npm --prefix ./packages/help.set-entire run test
results -c -- npm --prefix ./packages/help.string-argv run test
echo 'Testing "journey" suite...'
results -c -- npm --prefix ./packages/journey run test
results -c -- npm --prefix ./packages/journey.coerce-to-array run test
results -c -- npm --prefix ./packages/journey.coerce-to-plain-object run test
results -c -- npm --prefix ./packages/journey.fn-free run test
results -c -- npm --prefix ./packages/journey.fn-reduce run test
results -c -- npm --prefix ./packages/journey.is-promise run test
results -c -- npm --prefix ./packages/journey.pass-thru run test
echo 'Testing "pkg" suite...'
results -c -- npm --prefix ./packages/pkg run test
results -c -- npm --prefix ./packages/pkg-cli run test
results -c -- npm --prefix ./packages/pkg-plugin-babel-6-to-node-4 run test
results -c -- npm --prefix ./packages/pkg-plugin-babel-7-to-node-4 run test
results -c -- npm --prefix ./packages/pkg-plugin-cobalt run test
results -c -- npm --prefix ./packages/pkg-plugin-jest run test
results -c -- npm --prefix ./packages/pkg-plugin-name-dir run test
results -c -- npm --prefix ./packages/pkg-plugin-name-scope run test
results -c -- npm --prefix ./packages/pkg-plugin-prop run test
results -c -- npm --prefix ./packages/pkg-plugin-sort run test
results -c -- npm --prefix ./packages/pkg-plugin-standard run test
results -c -- npm --prefix ./packages/pkg.file-exists run test
results -c -- npm --prefix ./packages/pkg.fs run test
results -c -- npm --prefix ./packages/pkg.is-local-module run test
results -c -- npm --prefix ./packages/pkg.json-parse run test
results -c -- npm --prefix ./packages/pkg.pretty-json run test
results -c -- npm --prefix ./packages/pkg.prop-overwrite run test
results -c -- npm --prefix ./packages/pkg.read-json run test
results -c -- npm --prefix ./packages/pkg.throw-error run test
echo 'Testing "process" suite...'
results -c -- npm --prefix ./packages/results-cli run test
