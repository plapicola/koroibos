var Event = require('../models/event')

module.exports = class MedalistsIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static get_medalists(id) {
    return new Promise((resolve, reject) => {
      Event.medalists(id)
      .then(medalists => resolve(new MedalistsIndexFacade(200, medalists[0])))
      .catch(error => reject(new MedalistsIndexFacade(500, error)))
    })
  }
}
