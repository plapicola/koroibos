var express = require('express')
var router = express.Router();
var EventsController = require('../../../controllers/events')

router.get('/', EventsController.index);

module.exports = router;
