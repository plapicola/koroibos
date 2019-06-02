var Sport = require('../../models/sport')
var shell = require('shelljs')
var sportId;

describe('Sport Model', () => {
  beforeAll(() => {
    shell.exec('npx knex migrate:revert --all')
    shell.exec('npx knex migrate:latest')
  })

  test('Create', () => {
    return Sport.create({name: "Athletics"})
      .then([sport] => {
        expect(typeof(sport.id)).toBe("number")
        sportId = sport.id
        expect(sport.name).toBe("Athletics")
      })
  })

  test('all', () => {
    return Sport.all()
      .then(sports => {
        expect(sports.length).toBe(1)
        sport = sports[0]
        expect(sport.id).toBe(sportId)
        expect(sport.name).toBe("Athletics")
      })
  })

  test('find', () => {
    return Sport.find(sportId)
      .then(sport => {
        expect(sport.id).toBe(sportId)
        expect(sport.name).toBe("Athletics")
      })
  })
})
