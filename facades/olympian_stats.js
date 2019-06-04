var Olympian = require('../models/olympian')
var pry = require('pryjs')

module.exports = class OlympianStatsIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static get_statistics() {
    return new Promise((resolve, reject) => {
      Olympian.statistics()
      .then(([statistics]) => resolve(new OlympianStatsIndexFacade(200, statistics)))
      .catch(error => reject(new OlympianStatsIndexFacade(500, error)))
    })
  }
}
