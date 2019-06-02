var Olympian = require('../../models/olympian')
var shell = require('shelljs')

describe('Olympian Model', () => {
  beforeAll(() => {
    shell.exec('npx knex migrate:rollback --all')
    shell.exec('npx knex migrate:latest')
  })

  test("Create", () => {
    Olympian.create({name: "Test!", age: 25, height: 150, weight: 150, sex: "M"})
      .then([olympian] => {
        expect(typeof(olympian.id).toBe("number"))
        expect(olympian.name).toBe("Test!")
        expect(olympian.age).toBe("Test!")
        expect(olympian.height).toBe("Test!")
        expect(olympian.weight).toBe("Test!")
        expect(olympian.sex).toBe("M")
      })
  })
})
