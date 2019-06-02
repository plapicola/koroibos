var Olympian = require('../../models/olympian')
var shell = require('shelljs')

describe('Olympian Model', () => {
  beforeAll(() => {
    shell.exec('npx knex migrate:rollback --all');
    shell.exec('npx knex migrate:latest');
  })

  test("Create", () => {
    return Olympian.create({name: "Test!", age: 25, height: 150, weight: 140, sex: "M"})
      .then(([olympian]) => {
        expect(typeof(olympian.id)).toBe("number")
        expect(olympian.name).toBe("Test!")
        expect(olympian.age).toBe(25)
        expect(olympian.height).toBe(150)
        expect(olympian.weight).toBe(140)
        expect(olympian.sex).toBe("M")
      })
  })

  test("all", () => {
    return Olympian.all()
      .then(olympians => {
        expect(olympians.length).toBe(1)
        let olympian = olympians[0]
        expect(typeof(olympian.id)).toBe("number")
        expect(olympian.name).toBe("Test!")
        expect(olympian.age).toBe(25)
        expect(olympian.height).toBe(150)
        expect(olympian.weight).toBe(140)
        expect(olympian.sex).toBe("M")
      })
  })
})
