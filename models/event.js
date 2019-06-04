var knex = require('../knex.js')

module.exports = class Event {
  static create(e) {
    return new Promise((resolve, reject) => {
      knex('events').insert(e).returning("*")
      .then(e => resolve(e))
      .catch(error => reject(error))
    })
  }

  static all() {
    return knex('events').select("*");
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex("events").select("*").where("id", id)
      .then(([e]) => resolve(e))
      .catch(error => reject(error))
    })
  }

  static medalists(id) {
    return knex('events').select({
      event: "events.name",
      medalists: knex.raw("json_agg(json_build_object(?, event_medalists.medal, ?, olympians.name, ?, olympians.age, ?, teams.name)", ['medal', 'name', 'age', 'team'])
    })
    .innerJoin("event_medalists", "events.id", "event_medalists.event_id")
    .innerJoin("olympians", "olympians.id", "event_medalists.olympian_id")
    .innerJoin("teams", "teams.id", "olympians.team_id")
    .where("events.id", id)
    .groupByRaw("teams.name, olympians.name, events.name")
  }
}
