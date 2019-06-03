var app = require('../app')
var request = require('supertest')
var shell = require('shelljs')
var Olympian = require('../models/olympian')
var Team = require('../models/team')
var Sport = require('../models/sport')
var Event = require('../models/event')
var EventMedalist = require('../models/event_medalist')
var ryanId, michaelId, canadaId, germanyId, athleticsId, divingId, sprintId, platformId, eventMedalistId;

describe("Application", () => {
  describe("Root path", () => {
    test("Shows a welcome page", () => {
      return request(app).get("/")
        .then(response => {
          expect(response.status).toBe(200)
        })
    })
  })

  describe("Olympians Index Endpoint", () => {
    beforeAll(async () => {
      shell.exec('npx knex migrate:rollback --all')
      shell.exec('npx knex migrate:latest')
      await Team.create({name: "Canada"}).then(([team]) => canadaId = team.id)
      await Team.create({name: "Germany"}).then(([team]) => germanyId = team.id)
      await Sport.create({name: "Athletics"}).then(([sport]) => athleticsId = sport.id)
      await Sport.create({name: "Diving"}).then(([sport]) => divingId = sport.id)
      await Olympian.create({name: "Ryan Reynolds", team_id: canadaId, sport_id: athleticsId, age: 42, height: 150, weight: 140, sex: "M"})
        .then(([olympian]) => ryanId = olympian.id)
      await Olympian.create({name: "Michael Fassbender", team_id: germanyId, sport_id: divingId, age: 43, height: 150, weight: 140, sex: "M"})
        .then(([olympian]) => michaelId = olympian.id)
      await Event.create({name: "400M Sprint", sport_id: athleticsId}).then(([e]) => sprintId = e.id)
      await Event.create({name: "Platform Dive", sport_id: divingId}).then(([e]) => platformId = e.id)
      await EventMedalist.create({olympian_id: ryanId, event_id: sprintId, medal: "Gold"})
    })

    test("Returns all olympians", () => {
      return request(app).get("/api/v1/olympians")
        .then(response => {
          expect(response.status).toBe(200)
          expect(Array.isArray(response.body.olympians)).toBe(true)
          olympians = response.body.olympians
          expect(olympians.length).toBe(2)
          expect(olympians[0].name).toBe("Ryan Reynolds")
          expect(olympians[0].team).toBe("Canada")
          expect(olympians[0].age).toBe(42)
          expect(olympians[0].sport).toBe("Athletics")
          expect(olympians[0].total_medals_won).toBe(1)
          expect(olympians[1].total_medals_won).toBe(0)
        })
    })

    test("Returns youngest olympian", () => {
      return request(app).get("/api/v1/olympians?age=youngest")
        .then(response => {
          expect(response.status).toBe(200)
          expect(Array.isArray(response.body.olympians)).toBe(true)
          olympians = response.body.olympians
          expect(olympians.length).toBe(1)
          expect(olympians[0].name).toBe("Ryan Reynolds")
          expect(olympians[0].team).toBe("Canada")
          expect(olympians[0].age).toBe(42)
          expect(olympians[0].sport).toBe("Athletics")
          expect(olympians[0].total_medals_won).toBe(1)
        })
    })

    test("Returns oldest olympian", () => {
      return request(app).get("/api/v1/olympians?age=oldest")
        .then(response => {
          expect(response.status).toBe(200)
          expect(Array.isArray(response.body.olympians)).toBe(true)
          olympians = response.body.olympians
          expect(olympians.length).toBe(1)
          expect(olympians[0].name).toBe("Michael Fassbender")
          expect(olympians[0].team).toBe("Germany")
          expect(olympians[0].age).toBe(43)
          expect(olympians[0].sport).toBe("Diving")
          expect(olympians[0].total_medals_won).toBe(0)
        })
    })
  })
})
