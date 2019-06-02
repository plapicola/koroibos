var Team = require('../../models/Team');
var shell = require('shelljs');
var createdId;

describe("Team model", () => {
  beforeAll(() => {
    shell.exec('npx knex migrate:rollback --all');
    shell.exec('npx knex migrate:latest');
  })

  test("Create", () => {
    return Team.create({name: "Canada"})
      .then(([team]) => {
        expect(typeof(team.id)).toBe("number")
        createdId = team.id
        expect(team.name).toBe("Canada")
      })
  })

  test("All", () => {
    return Team.all()
      .then(teams => {
        expect(teams.length).toBe(1)
        team = teams[0];
        expect(team.id).toBe(createdId);
        expect(team.name).toBe("Canada")
      })
  })

  test("Find", () => {
    return Team.find(createdId)
      .then(team => {
        expect(team.id).toBe(createdId)
        expect(team.name).toBe("Canada")
      })
  })
})
