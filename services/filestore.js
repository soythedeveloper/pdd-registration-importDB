const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');

const serviceAccount = require('./service-account.json');
//const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

class Filestore{

   async import(dbjsonfile){
    try {
      console.log('Initializing Firebase-----------------------');
      await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
      console.log('Firebase Initialized-----------------------');
      const status = await firestoreService.restore(dbjsonfile);
      console.log('Upload Success-----------------------');
      console.log(status);
      return status;
    }
    catch (error) {
      console.log(error);
    }
  }
}


module.exports = Filestore;
