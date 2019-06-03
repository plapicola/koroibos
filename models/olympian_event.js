const knex = require('../knex.js')

module.exports = class OlympianEvent {
  static create(olympianEvent) {
    return new Promise((resolve, reject) => {
      knex("olympian_events").insert(olympianEvent).returning("*")
      .then(olympianEvents => resolve(olympianEvents))
      .catch(error => reject(error))
    })
  }

  static all() {
    return knex("olympian_events").select("*")
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex("olympian_events").select("*").where("id", id)
      .then(([olympian_event]) => resolve(olympian_event))
      .catch(error => reject(error))
    })
  }
}
