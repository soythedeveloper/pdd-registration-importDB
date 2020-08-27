const express = require("express");
const process = require("process");
const path = require("path");
const fs = require("fs");
const Busboy = require("busboy");
const auth = require("../services/auth.js");

const router = express.Router();
const user = new auth();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.loggedIn) {
    res.render("admin", {
      title: "Home",
      isSignedIn: true,
      adminName: ` back ${req.session.useremail}`,
    });
  } else {
    res.render("index");
  }
});

router.get("/admin", function (req, res, next) {
  if (req.session.loggedIn) {
    res.render("admin", {
      title: "Home",
      isSignedIn: true,
      adminName: ` back ${req.session.useremail}`,
    });
  } else {
    res.render("index");
  }
});

router.post("/admin", function (req, res, next) {
  user
    .signin(req.body.inputEmail, req.body.inputPassword)
    .then((credentials) => {
      req.session.loggedIn = true;
      req.session.useremail = credentials.user.email;

      res.render("index", {
        title: "Home",
        isSignedIn: true,
        adminName: credentials.user.email,
      });
    })
    .catch((err) => {
      res.render("error", {
        message: err.code,
        error: {
          status: 404,
          stack: err.message,
        },
      });
    });
});

router.get("/logout", function (req, res, next) {
  user.signout();
  req.session.destroy((err) => {
    console.log("error occured while clearing the session");
  });
  res.redirect("/");
});

router.post("/upload", function (req, res, next) {
  var uploadPath = path.join(process.cwd(), "public/uploads/database.csv");
  console.log(uploadPath);
  var busboy = new Busboy({
    headers: req.headers,
  });

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    file.on("data", function (data) {
      console.log("File [" + filename + "] was successfully uploaded...");
    });

    const writeStream = fs.createWriteStream(uploadPath);
    file.pipe(writeStream);

    file.on("end", () => writeStream.end());

    writeStream.on("error", (err) => {
      console.log("there was an error: " + err);
    });
  });

  busboy.on("finish", function () {
    res.render("confirmation", {
      isSignedIn: true,
      message:
        "File saved successfully. You can now start migration. <br> It can take few minutes for fully create all Documents in Database <br> See Dev Console for more details",
    });
  });

  req.pipe(busboy);
});

module.exports = router;
