const firebaseConfig = {
  apiKey: "AIzaSyDl-1oy6ekvb_6CzfZmQd61WyoWuQBiEjA",
  authDomain: "project-pdd-registration.firebaseapp.com",
  databaseURL: "https://project-pdd-registration.firebaseio.com",
  projectId: "project-pdd-registration",
  storageBucket: "project-pdd-registration.appspot.com",
  messagingSenderId: "125332366348",
  appId: "1:125332366348:web:5fbf9fd52952487506fa29",
  measurementId: "G-ZGGGVZ2ZW4",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/*** migrate to firebase */
var migrationProgress = $("#migration-progress");
var migrationProgressInfo = $("#migration-progress-info");

$("#btn-migrate-to-firebase").on("click", function () {
  d3.csv("/uploads/database.csv").then(function (data) {
    var percentage = 0;
    for (var i = 0; i < data.length; i++) {
      var doc = data[i];
      db.collection("retraitants")
        .add(doc)
        .then(function () {
          console.log(`${doc} is imported successfully to firestore!`);
          percentage = (i / data.length) * 100;
          migrationProgress.attr(
            "style",
            "width: " + Math.ceil(percentage) + "%"
          );
          migrationProgress.attr("aria-valuenow", Math.ceil(percentage));
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }
  });
});

$("#inputPassword").on("input", function () {
  if ($(this).val().length >= 6) {
    $("#pwd-has-error").remove();
  }
});

$("#inputPasswordConfirm").on("input", function () {
  if ($("#inputPassword").val() == $(this).val()) {
    $("#pwd-must-match").remove();
  }
});

$("#inputPassword").on("focusin", function () {
  $(this).addClass("has-focus");
  if ($(this).val().length < 5)
    $(this).after(
      '<span class="text-danger font-weight-light" id="pwd-has-error">Password must be at least 6 characters long</span>'
    );
});

$("#inputPasswordConfirm").on("focusin", function () {
  $(this).addClass("has-focus");
  if ($("#inputPassword").val() != $(this).val()) {
    $(this).after(
      '<span class="text-danger font-weight-light" id="pwd-must-match">Your passwords must match</span>'
    );
  }
});
/*
 Upload File Input
*/
$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
