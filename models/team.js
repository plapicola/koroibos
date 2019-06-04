const knex = require("../knex.js")

module.exports = class Team {
  static create(team) {
    return new Promise((resolve, reject) => {
      knex('teams').insert(team).returning("*")
      .then(teams => resolve(teams))
      .catch(error => reject(error))
    })
  }

  static all() {
    return knex("teams").select("*")
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex('teams').select("*").where('id', id)
      .then(([team]) => resolve(team))
      .catch(error => reject(error))
    })
  }

  static find_or_create(team) {
    return new Promise((resolve, reject) => {
      knex('team').where("name", team.name)
      .then((team) => {
        return team.length ? team : Team.create(team)
      })
      .then(([team]) => resolve(team))
      .catch(error => reject(error))
    })
  }
}
