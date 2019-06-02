const knex = require('../knex.js')

module.exports = class Olympian {
  static create(olympian) {
    return new Promise((resolve, reject) => {
      knex('olympians').insert(olympian).returning("*")
      .then(olympians => resolve(olympians))
      .catch(error => reject(error))
    })
  }
}
