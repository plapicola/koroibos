var Event = require('../../models/event')
var shell = require('shelljs')
var eventId;
var sportId;

describe("Event Model", () => {
  beforeAll(async () => {
    shell.exec("npx knex migrate:rollback --all")
    shell.exec("npx knex migrate:latest")
    await Sport.create({name: "Athletics"})
    .then(([sport]) => sportId = sport.id)
  })

  test("Create", () => {
    return Event.create({name: "400 M Sprint", sport_id: sportId})
      .then(([newEvent]) => {
        expect(typeof(newEvent.id)).toBe("number")
        eventId = newEvent.id
        expect(newEvent.name).toBe("400 M Sprint")
      })
  })

  test("All", () => {
    return Event.all()
      .then(events => {
        expect(events.length).toBe(1)
        foundEvent = events[0]
        expect(foundEvent.id).toBe(eventId)
        expect(foundEvent.name).toBe("400 M Sprint")
      })
  })

  test("Find", () => {
    return Event.find(eventId)
      .then(foundEvent => {
        expect(foundEvent.id).toBe(eventId)
        expect(foundEvent.name).toBe("400 M Sprint")
      })
  })
})
