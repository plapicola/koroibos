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
      medalists: knex.raw("json_agg(json_build_object(?::text, event_medalists.medal, ?::text, olympians.name, ?::text, olympians.age, ?::text, teams.name))", ['medal', 'name', 'age', 'team'])
    })
    .leftJoin("event_medalists", "events.id", "event_medalists.event_id")
    .leftJoin("olympians", "olympians.id", "event_medalists.olympian_id")
    .leftJoin("teams", "teams.id", "olympians.team_id")
    .where("events.id", id)
    .groupByRaw("events.name")
  }
}
