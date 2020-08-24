const express = require('express');
const process = require('process');
const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');
const auth = require('../services/auth.js');
const database = require('../services/database.js');

const router = express.Router();
const user = new auth();

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.session.loggedIn) {
    res.render('admin', {
      title: 'Home',
      isSignedIn: true,
      adminName: ` back ${req.session.useremail}`
    });
  } else {
    res.render('index');
  }

});


router.get('/admin', function(req, res, next) {

    if(req.session.loggedIn){
      res.render('admin', {
        title: 'Home',
        isSignedIn: true,
        adminName: ` back ${req.session.useremail}`
      });
    }
    else{
      res.render('index');
    }

});


router.post('/admin', function(req, res, next) {

  user.signin(req.body.inputEmail, req.body.inputPassword).then(credentials => {

    req.session.loggedIn = true;
    req.session.useremail = credentials.user.email;

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
  req.session.destroy(err => {
    console.log("error occured while clearing the session")
  });
  res.redirect('/');

});


router.post('/upload', function(req, res, next) {
  const fsInstance = new database();

  var uploadPath = path.join(process.cwd(), 'uploads');
  var busboy = new Busboy({
    headers: req.headers
  });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

    var saveTo = path.join(uploadPath, path.basename(filename));

    file.on('data', function(data) {
      console.log('File [' + filename + '] was successfully uploaded...');
    });

    const writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);

    file.on('end', () => writeStream.end());

    writeStream.on('finish', () => {
      console.log("Import into Firebase will start now...");
      fsInstance.import(saveTo);
    });
    writeStream.on('error', (err) => {
      console.log("there was an error")
    });
  });

  busboy.on('finish', function() {
    res.render('confirmation', {
      isSignedIn: true,
      message: 'Data uploaded successfully. It can take few minutes for fully create all Documents in Database'

    });

  });

  req.pipe(busboy);

});


module.exports = router;
