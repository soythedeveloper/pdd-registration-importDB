const express = require('express');
const router = express.Router();

const formidable = require('formidable');
const fs = require('fs');
const auth = require('../services/auth.js');
const user = new auth();

const database = require('../services/database.js');
const process = require('process');

const firebase = require('firebase');


/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index');


  firebase.auth().onAuthStateChanged( user =>{
    if(user){

      res.render('admin', {
        title: 'Home',
        isSignedIn: true,
        adminName: user.email
      });
    }else{
      res.render('index');
    }

  });
});


/* GET home page. */
router.get('/admin', function(req, res, next) {
  firebase.auth().onAuthStateChanged( user =>{
    if(user){

      res.render('admin', {
        title: 'Home',
        isSignedIn: true,
        adminName: user.email
      });
    }else{
      res.redirect('/');
    }

  });

});


router.post('/admin', function(req, res, next) {

  user.signin(req.body.inputEmail, req.body.inputPassword).then(credentials => {

    res.render('index', {
      title: 'Home',
      isSignedIn: true,
      adminName: credentials.user.email
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


router.get('/logout', function(req, res, next) {
  user.signout();
  return res.redirect('/');

});

router.post('/upload', function(req, res, next) {

  const form = formidable();
  const fsIntance = new database();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.inputDbFile.path;
    var newpath = process.cwd() + '/uploads/' + files.inputDbFile.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
    });
    //import data into remote DB
    const uploadStatus = fsIntance.import(newpath);

    return res.render('confirmation', {
      isSignedIn: true,
      message: 'Data uploaded successfully. It can take few minutes for fully create all Documents in Database'
    });

  });

});


module.exports = router;
