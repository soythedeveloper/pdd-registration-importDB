const firebase = require('firebase');
const firebaseConfig = require('./config.js');

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


class Auth{

  signin(email,password){
    return auth.signInWithEmailAndPassword(email, password);
  }

  signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
  }

  signout(){
    return auth.signOut();
  }


}

module.exports = Auth
