var Olympian = require('../../models/olympian')
var Team = require('../../models/team')
var shell = require('shelljs')
var firstId;
var teamId;

describe('Olympian Model', () => {
  beforeAll(async () => {
    shell.exec('npx knex migrate:rollback --all');
    shell.exec('npx knex migrate:latest');
    await Team.create({name: "Canada"})
    .then(([team]) => teamId = team.id)
  })

  test("Create", () => {
    return Olympian.create({name: "Test!", team_id: teamId, age: 25, height: 150, weight: 140, sex: "M"})
      .then(([olympian]) => {
        expect(typeof(olympian.id)).toBe("number")
        firstId = olympian.id;
        expect(olympian.name).toBe("Test!")
        expect(olympian.age).toBe(25)
        expect(olympian.height).toBe(150)
        expect(olympian.weight).toBe(140)
        expect(olympian.sex).toBe("M")
        expect(olympian.team_id).toBe(teamId)
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
        expect(olympian.team_id).toBe(teamId)
      })
  })

  test("find", () => {
    return Olympian.find(firstId)
      .then(olympian => {
        expect(typeof(olympian.id)).toBe("number")
        expect(olympian.name).toBe("Test!")
        expect(olympian.age).toBe(25)
        expect(olympian.height).toBe(150)
        expect(olympian.weight).toBe(140)
        expect(olympian.sex).toBe("M")
        expect(olympian.team_id).toBe(teamId)
      })
  })
})
