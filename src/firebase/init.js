// Your web app's Firebase configuration
import firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADdx-8Q14ugVB6MUEoJHJ5jheDEI8HeOw",
    authDomain: "symptomchecker-5da73.firebaseapp.com",
    databaseURL: "https://symptomchecker-5da73.firebaseio.com",
    projectId: "symptomchecker-5da73",
    storageBucket: "symptomchecker-5da73.appspot.com",
    messagingSenderId: "152060160353",
    appId: "1:152060160353:web:7975177ae16cd557053d20",
    measurementId: "G-QCWW23N9VS"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({ timestampsInSnapshots: true });

  export default firebaseApp.firestore();