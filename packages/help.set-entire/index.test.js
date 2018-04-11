import setEntire from './index.js'

test('setEntire', () => {
  const d = setEntire({
    'example': true,
    'person.firstName': 'Thomas',
    'person.lastName': 'Reggi',
    'person.age': 28
  })
  expect(d.example).toEqual(true)
  expect(d.person.firstName).toEqual('Thomas')
  expect(d.person.lastName).toEqual('Reggi')
  expect(d.person.age).toEqual(28)
})
