var Olympian = require('../../models/olympian')
var Team = require('../../models/team')
var Sport = require('../../models/sport')
var Event = require('../../models/event')
var OlympianEvent = require('../../models/olympian_event')
var shell = require('shelljs')
var olympianId, teamId, sportId, eventId, olympianEventId;

describe('OlympianEvent model', () => {
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
    return OlympianEvent.create({olympian_id: olympianId, event_id: eventId})
      .then(([olympian_event]) => {
        expect(typeof(olympian_event.id)).toBe("number")
        olympianEventId = olympian_event.id
        expect(olympian_event.olympian_id).toBe(olympianId)
        expect(olympian_event.event_id).toBe(eventId)
      })
  })

  test("All", () => {
    return OlympianEvent.all()
      .then(olympian_events => {
        expect(olympian_events.length).toBe(1)
        olympianEvent = olympian_events[0]
        expect(olympianEvent.id).toBe(olympianEventId)
        expect(olympianEvent.olympian_id).toBe(olympianId)
        expect(olympianEvent.event_id).toBe(eventId)
      })
  })

  test("Find", () => {
    return OlympianEvent.find(olympianEventId)
      .then(e => {
        expect(e.id).toBe(olympianEvent.id)
        expect(e.olympian_id).toBe(olympianId)
        expect(e.event_id).toBe(eventId)
      })
  })
})
