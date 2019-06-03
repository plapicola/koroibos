var Sport = require('../models/sport')

module.exports = class EventsIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static retreive_all() {
    return new Promise((resolve, reject) => {
      Sport.with_events()
      .then(sports => resolve(new EventsIndexFacade(200, sports)))
      .catch(error => reject(new EventsIndexFacade(500, error)))
    })
  }
}
