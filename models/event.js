var knex = require('../knex.js')

module.exports = class Event {
  static create(e) {
    return new Promise((resolve, reject) => {
      knex('events').insert(e).returning("*")
      .then(([e]) => resolve(e))
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
}
