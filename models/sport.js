var knex = require('../knex.js')

module.exports = class Sport {
  static create(sport) {
    return new Promise((resolve, reject) => {
      knex('sports').insert(sport).returning("*")
        .then(sports => resolve(sports))
        .catch(error => reject(error))
    })
  }

  static all() {
    return knex('sports').select("*")
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex('sports').select("*").where("id", id)
      .then(([sport]) => resolve(sport))
      .catch(error => reject(error))
    })
  }
}
