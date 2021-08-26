import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBH3lziX7D4Gqxt3ARTrvHbTwpsa0IWfXU",
    authDomain: "pc-challenge.firebaseapp.com",
    databaseURL: "https://pc-challenge.firebaseapp.com",
    projectId: "pc-challenge",
    storageBucket: "pc-challenge.appspot.com",
    messagingSenderId: "248212202120",
    appId: "1:248212202120:web:6f2532390f11da543e353d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase};