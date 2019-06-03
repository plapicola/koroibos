var Olympian = require('../models/olympian')

module.exports = class OlympiansIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static retreive_all() {
    return new Promise((resolve, reject) => {
      Olympian.all_for_request()
      .then(olympians => resolve(new OlympiansIndexFacade(200, olympians)))
      .catch(error => reject(new OlympiansIndexFacade(500, error)))
    })
  }
}
