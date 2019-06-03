var OlympiansIndexFacade = require('../facades/olympians_index');
var OlympiansSerializer = require('../serializers/olympians');

module.exports = class OlympiansController {
  static index(req, res) {
    res.setHeader("Content-Type", "application/json")
    selectAge(req.query.age)
    .then(facade => {
      res.status(facade.status).send(OlympiansSerializer.formatAll(facade.body))
    })
    .catch(facade => {
      res.status(facade.status).send(facade.body)
    })
  }
}

function selectAge(ageParam) {
  return new Promise((resolve, reject) => {
    switch (ageParam) {
      case 'youngest': resolve(OlympiansIndexFacade.retreive_youngest()); break;
      default: resolve(OlympiansIndexFacade.retreive_all()); break;
    }
  })
}
