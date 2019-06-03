var EventsIndexFacade = require('../facades/events_index')
var EventsSerializer = require('../serializers/events')

module.exports = class EventsController {
  static index(req, res) {
    res.setHeader("Content-Type", "application/json")
    EventsIndexFacade.retreive_all()
    .then(facade => {
      res.status(facade.status).send(EventsSerializer.formatAll(facade.body))
    })
    .catch(facade => {
      res.status(facade.status).send(facade.body)
    })
  }
}
