const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');

const serviceAccount = require('./service-account.json');
//const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

class Database{


   async import(dbjsonfile){
    try {
      await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
      const status = await firestoreService.restore(dbjsonfile);
      console.log(status);
    }
    catch (error) {
      console.log(error);
    }
  }
}


module.exports = Database;
