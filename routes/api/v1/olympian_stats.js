var express = require('express')
var router = express.Router();
var OlympianStatsController = require('../../../controllers/olympian_stats');

router.get('/', OlympianStatsController.index);

module.exports = router;
