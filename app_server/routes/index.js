var express = require('express');
var router = express.Router();
var locController = require('../controllers/locController');
var aboutController = require('../controllers/aboutController');

/* GET home page. */
router.get('/', locController.homelist);
router.get('/location', locController.locationInfo);
router.get('/location/review/new', locController.addReview);

// GET about page
router.get('/about', aboutController.about);

module.exports = router;
