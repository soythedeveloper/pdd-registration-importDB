var express = require('express');
var router = express.Router();

/* GET /retreatants */
router.get('/', function(req, res, next) {
  res.send('Home page /retreatants');
});

/* upload Retreatans List to DB */
router.post('/upload', function(req, res, next) {
  res.send('Load retreatants List for the DB');
});

module.exports = router;
