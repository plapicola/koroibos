var Olympian = require('../../models/olympian')
var Team = require('../../models/team')
var Sport = require('../../models/sport')
var Event = require('../../models/event')
var EventMedalist = require('../../models/event_medalist')
var shell = require('shelljs')
var olympianId, teamId, sportId, eventId, eventMedalistId;

describe('EventMedalist model', () => {
  beforeAll(async () => {
    shell.exec('npx knex migrate:rollback --all')
    shell.exec('npx knex migrate:latest')
    await Team.create({name: "Canada"}).then(([team]) => teamId = team.id)
    await Sport.create({name: "Athletics"}).then(([sport]) => sportId = sport.id)
    await Olympian.create({name: "Test!", team_id: teamId, sport_id: sportId, age: 25, height: 150, weight: 140, sex: "M"})
      .then(([olympian]) => olympianId = olympian.id)
    await Event.create({name: "400M Sprint", sport_id: sportId}).then(([e]) => eventId = e.id)
  })

  test("Create", () => {
    return EventMedalist.create({event_id: eventId, olympian_id: olympianId, medal: "Gold"})
    .then(([event_medalist]) => {
      expect(typeof(event_medalist.id)).toBe("number")
      eventMedalistId = event_medalist.id
      expect(event_medalist.event_id).toBe(eventId)
      expect(event_medalist.olympian_id).toBe(olympianId)
      expect(event_medalist.medal).toBe("Gold")
    })
  })

  test("All", () => {
    return EventMedalist.all()
      .then(event_medalists => {
        expect(event_medalists.length).toBe(1)
        eventMedalist = event_medalists[0]
        expect(eventMedalist.event_id).toBe(eventId)
        expect(eventMedalist.event_id).toBe(eventId)
        expect(eventMedalist.olympian_id).toBe(olympianId)
        expect(eventMedalist.medal).toBe("Gold")
      })
  })
})
