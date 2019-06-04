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

  static all_for_request() {
    return knex("olympians")
      .select({
        name: "olympians.name",
        team: "teams.name",
        age: "olympians.age",
        sport: "sports.name",
        total_medals_won: knex.raw("COUNT(event_medalists.medal)")
      })
     .innerJoin("teams", "olympians.team_id", "teams.id")
     .innerJoin("sports", "olympians.sport_id", "sports.id")
     .leftJoin("event_medalists", "olympians.id", "event_medalists.olympian_id")
     .orderBy("olympians.id")
     .groupByRaw("sports.name, teams.name, olympians.id");
  }

  static youngest_for_request() {
    return knex("olympians")
      .select({
        name: "olympians.name",
        team: "teams.name",
        age: "olympians.age",
        sport: "sports.name",
        total_medals_won: knex.raw("COUNT(event_medalists.medal)")
      })
     .innerJoin("teams", "olympians.team_id", "teams.id")
     .innerJoin("sports", "olympians.sport_id", "sports.id")
     .leftJoin("event_medalists", "olympians.id", "event_medalists.olympian_id")
     .orderBy("olympians.age")
     .groupByRaw("sports.name, teams.name, olympians.id")
     .limit(1);
  }

  static oldest_for_request() {
    return knex("olympians")
      .select({
        name: "olympians.name",
        team: "teams.name",
        age: "olympians.age",
        sport: "sports.name",
        total_medals_won: knex.raw("COUNT(event_medalists.medal)")
      })
     .innerJoin("teams", "olympians.team_id", "teams.id")
     .innerJoin("sports", "olympians.sport_id", "sports.id")
     .leftJoin("event_medalists", "olympians.id", "event_medalists.olympian_id")
     .orderBy("olympians.age", "desc")
     .groupByRaw("sports.name, teams.name, olympians.id")
     .limit(1);
  }

  static statistics() {
    let test = {
      male: "M",
      female: "F"
    }
    return knex('olympians')
      .select({
        total_competing_olympians: knex.raw("COUNT(olympians.id)"),
        average_male_weight: knex.raw("AVG(CASE WHEN olympians.sex = :male THEN olympians.weight ELSE null END)", test),
        average_female_weight: knex.raw("AVG(CASE WHEN olympians.sex = :female THEN olympians.weight ELSE null END)", test),
        average_age: knex.raw("AVG(olympians.age)")
      })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      knex("olympians").select("*").where('id', id).limit(1)
      .then(([olympian]) => resolve(olympian))
      .catch(error => reject(null))
    })
  }

  static find_or_create(olympian) {
    return new Promise((resolve, reject) => {
      knex('olympian')
      .where("name", olympian.name)
      .where("sex", olympian.sex)
      .where("age", olympian.age)
      .where("team_id", olympian.team_id)
      .where("sport_id", olympian.sport_id)
      .where("height", olympian.height)
      .where("weight", olympian.weight)
      .then((olympian) => {
        return olympian.length ? olympian : Olympian.create(olympian)
      })
      .then(([olympian]) => resolve(olympian))
      .catch(error => reject(error))
    })
  }
}
