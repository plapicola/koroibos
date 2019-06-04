var OlympianStatsIndexFacade = require('../facades/olympian_stats')
var OlympianStatsSerializer = require('../serializers/olympian_stats')

module.exports = class OlympianStatsController {
  static index(req, res) {
    res.setHeader("Content-Type", "application/json")
    OlympianStatsIndexFacade.get_statistics()
    .then(facade => {
      res.status(facade.status).send(OlympianStatsSerializer.formatOne(facade.body))
    })
    .catch(facade => {
      res.status(facade.status).send(facade.body)
    })
  }
}
