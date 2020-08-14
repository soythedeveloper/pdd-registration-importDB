var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

var filestore = require('../services/filestore.js');
const process = require('process');


/* GET /retreatants */
router.get('/', function(req, res, next) {
  res.send('Home page /retreatants');
});

/* upload Retreatans List to DB */
router.post('/upload', function(req, res, next) {
  const form = formidable();
  const fsIntance = new filestore();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.inputDbFile.path;
    var newpath = process.cwd() + '/uploads/' + files.inputDbFile.name;
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
    });
    //import data into remote DB
    const uploadStatus = fsIntance.import(newpath);

   res.json({
      status: 'Well done!',
      message: 'Data uploaded successfully. It can take few minutes for fully create all Documents in Database'
    });
  //  res.json(uploadStatus);
  });


});

module.exports = router;
