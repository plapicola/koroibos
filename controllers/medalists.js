var MedalistsIndexFacade = require('../facades/medalists_index')

module.exports = class MedalistsController {
  static index(req, res) {
    res.setHeader("Content-Type", "application/json")
    MedalistsIndexFacade.get_medalists(req.params.id)
    .then(facade => {
      res.status(facade.status).send(facade.body)
    })
    .catch(facade => {
      res.status(facade.status).send(facade.body)
    })
  }
}
