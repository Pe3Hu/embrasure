const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCrWOSECW_JZOw7xFs4tezsbHNlgntcOro",
  authDomain: "testapp-60482.firebaseapp.com",
  projectId: "testapp-60482",
  storageBucket: "testapp-60482.firebasestorage.app",
  messagingSenderId: "225539671816",
  appId: "1:225539671816:web:62b50fea8b13ea0d930ebd",
  measurementId: "G-E8L45PMR75",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rooms = db.collection("rooms");
export { rooms };
