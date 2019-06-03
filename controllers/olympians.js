var OlympiansIndexFacade = require('../facades/olympians_index');
var OlympiansSerializer = require('../serializers/olympians');

module.exports = class OlympiansController {
  static index(req, res) {
    res.setHeader("Content-Type", "application/json")
    OlympiansIndexFacade.retreive_all()
    .then(facade => {
      res.status(facade.status).send(OlympiansSerializer.formatAll(facade.body))
    })
    .catch(facade => {
      res.status(facade.status).send(facade.body)
    })
  }
}
