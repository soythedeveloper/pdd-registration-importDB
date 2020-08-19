var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  loginStatus = true;
  return res.render('index', { title: 'Home', isSignedIn: loginStatus });
});

module.exports = router;
