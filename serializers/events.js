module.exports = class EventsSerializer {
  static formatOne(e) {
    return {
      id: e.id,
      name: e.name
    }
  }

  static formatAll(events) {
    return {
      events: events.map((events) => {
        return {
          sport: events.name,
          events: events.events.map((e) => {
            return EventsSerializer.formatOne(e)
          })
        }
      })
    }
  }
}
