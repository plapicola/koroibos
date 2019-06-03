var express = require('express')
var router = express.Router();
var OlympiansController = require('../../../controllers/olympians');

router.get('/', OlympiansController.index);
