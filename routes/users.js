var express = require('express');
var router = express.Router();

const auth = require('../services/auth.js');
const user = new auth();

router.get('/', function(req, res, next) {
  res.render('signin', {
    title: "Sign in"
  });
});


router.post('/signin', function(req, res, next) {

  user.signin(req.body.inputEmail, req.body.inputPassword).then(credentials => {
    res.render('index', {
      title: 'Home',
      isSignedIn: true
    });
  }).catch(err => {
    res.render('error', {
      message: err.code,
      error: {
        status: 404,
        stack: err.message
      }
    });
  });

});


router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: "Sign up"
  });
});


router.post('/signup', function(req, res, next) {

  user.signup(req.body.inputEmail, req.body.inputPassword).then(
    credentials => {
      res.render('index', {
        title: 'Home',
        isSignedIn: false
      })
    }
  ).catch(
    err => {
      res.render('error', {
        message: err.code,
        error: {
          status: 404,
          stack: err.message
        }
      })
    }

  );

});


router.get('/signout', function(req, res, next) {
  user.signout();
  return res.redirect('/users');

});

module.exports = router;
