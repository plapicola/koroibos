module.exports = class OlympiansSerializer {
  static formatOne(olympian) {
    return {
      name: olympian.name,
      team: olympian.team,
      age: parseInt(olympian.age),
      sport: olympian.sport,
      total_medals_won: parseInt(olympian.total_medals_won)
    }
  }

  static formatAll(olympians) {
    return {
        olympians: olympians.map(function(olympian) {
        return OlympiansSerializer.formatOne(olympian);
      })
    }
  }
}
