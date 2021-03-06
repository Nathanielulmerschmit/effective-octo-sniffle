var express = require('express');
var router = express.Router();

var database_controller = require('../controllers/databaseController');

router.get('/route/:id/depart/:id_2/dest/:id_3', database_controller.shuttle_times_get);

router.get('/route/:id/depart/:id_2/dest/:id_3/time/:id_4', database_controller.shuttle_times_scheduled_get)

module.exports = router;