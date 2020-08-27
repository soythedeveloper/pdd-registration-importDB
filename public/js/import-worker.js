importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.19.0/firebase-analytics.js"
);
importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-auth.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.19.0/firebase-firestore.js"
);
importScripts("https://d3js.org/d3-dsv.v2.min.js");
importScripts("https://d3js.org/d3-fetch.v2.min.js");

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

this.onmessage = function (event) {
  console.log(event.data);
  console.log("[From Worker]: I am starting my job now. Importing data");
  importDatabase();
  this.postMessage("[From Worker]: I have finished!");
};

const importDatabase = function () {
  d3.csv("/uploads/database.csv").then((data) => {
    addDocument(data);
  });
};

const addDocument = function (data) {
  for (var i = 0; i < data.length; i++) {
    var doc = data[i];
    db.collection("retraitants")
      .add(doc)
      .then(() => {
        console.log(`${doc} was imported successfully to firestore!`);
      })
      .catch((err) => {
        console.error("Error writing document: ", err);
      });
  }
};
