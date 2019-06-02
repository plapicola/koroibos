const knex = require('../knex.js')

module.exports = class Olympian {
  static create(olympian) {
    return new Promise((resolve, reject) => {
      knex('olympians').insert(olympian).returning("*")
      .then(olympians => resolve(olympians))
      .catch(error => reject(error))
    })
  }

  static all() {
    return knex("olympians").select("*")
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex("olympians").select("*").where('id', id).limit(1)
      .then(([olympian]) => resolve(olympian))
      .catch(error => reject(null))
    })
  }
}
