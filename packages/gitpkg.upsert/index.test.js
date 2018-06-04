import upsert, {defaultQuery} from './index'

test('upsert', () => {
  const results = upsert([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'}
  ], {name: 'brooke', job: 'streamer'}, 'name')
  expect(results).toEqual([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'streamer'},
    {name: 'birdman', job: 'cellist'}
  ])
})

test('upsert: three things first update', () => {
  const results = upsert([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'}
  ], {name: 'dolphin', job: 'pancake maker'}, 'name')
  expect(results).toEqual([
    {name: 'dolphin', job: 'pancake maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'}
  ])
})

test('upsert: one update', () => {
  const results = upsert([
    {name: 'dolphin', job: 'waffle maker'}
  ], {name: 'dolphin', job: 'pancake maker'}, 'name')
  expect(results).toEqual([
    {name: 'dolphin', job: 'pancake maker'}
  ])
})

test('upsert: adding a prop', () => {
  const results = upsert([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'}
  ], {name: 'brooke', job: 'streamer', cust: true}, 'name')
  expect(results).toEqual([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'streamer', cust: true},
    {name: 'birdman', job: 'cellist'}
  ])
})

test('upsert: with a custom function', () => {
  const results = upsert([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'}
  ], {name: 'brooke', job: 'streamer', cust: true}, defaultQuery('name'))
  expect(results).toEqual([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'streamer', cust: true},
    {name: 'birdman', job: 'cellist'}
  ])
})

test('upsert: with no match', () => {
  const results = upsert([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'}
  ], {name: 'sallymae', job: 'banker', cust: true}, defaultQuery('name'))
  expect(results).toEqual([
    {name: 'dolphin', job: 'waffle maker'},
    {name: 'brooke', job: 'youtube watcher'},
    {name: 'birdman', job: 'cellist'},
    {name: 'sallymae', job: 'banker', cust: true}
  ])
})
