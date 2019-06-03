var express = require('express')
var router = express.Router();
var OlympianStatsController = require('../../../controllers/olympian_stats');

router.get('/api/v1/olympian_stats', OlympianStatsController.index);

module.exports = router;
