import  firebase  from "firebase/app";


// import 'firebase/auth';        // for authentication
// import 'firebase/storage';     // for storage
// import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging
// import 'firebase/functions';   // for cloud functions
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByPNLtfNCi-g5eg91Mcrgfy_KIqrp_s3g",
    authDomain: "kaaya-cd49c.firebaseapp.com",
    projectId: "kaaya-cd49c",
    storageBucket: "kaaya-cd49c.appspot.com",
    messagingSenderId: "414568024103",
    appId: "1:414568024103:web:4d2f73aa8133535bd3a602",
    measurementId: "G-MPQYH7QM1E"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;