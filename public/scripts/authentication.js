



const firebase =  require('firebase/app');
const firebaseAuth = require('firebase/auth');



const authentication = firebase.initializeApp({
  // Firebase configuration - to be placed in .env file ideally //TODO
  apiKey: "AIzaSyCyoXlkQ6056DnUQBNli59b5zDHrLGUbpQ",
  authDomain: "ezt8akout.firebaseapp.com",
  projectId: "ezt8akout",
  storageBucket: "ezt8akout.appspot.com",
  messagingSenderId: "281466139647",
  appId: "1:281466139647:web:8dd91a94521425110eedca"

});

const auth = authentication.auth()
module.exports = authentication;
