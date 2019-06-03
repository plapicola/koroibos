const knex = require('../knex.js')

module.exports = class EventMedalist {
  static create(eventMedalist) {
    return new Promise((resolve, reject) => {
      knex('event_medalists').insert(eventMedalist).returning("*")
      .then(event_medalist => resolve(event_medalist))
      .catch(error => reject(error))
    })
  }

  static all() {
    return knex('event_medalists').select("*")
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex('event_medalists').select("*").where("id", id)
      .then(([event_medalist]) => resolve(event_medalist))
      .catch(error => reject(error))
    })
  }
}
