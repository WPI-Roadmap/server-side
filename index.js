const express = require('express');

const app = express();

// Required for side-effects

const admin = require('firebase-admin');
const credientials = require("./key.json");

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCaGXV8uK00pSjswXam4G8z4es_WkCx6B4",
  authDomain: "roadmap-wpi.firebaseapp.com",
  projectId: "roadmap-wpi",
  storageBucket: "roadmap-wpi.appspot.com",
  messagingSenderId: "619098314080",
  appId: "1:619098314080:web:d4d7acca43c684c83aba05"
};

// Initialize Firebase
const appF = admin.initializeApp({
    credential: admin.credential.cert(credientials),
});


// Initialize Cloud Firestore and get a reference to the service
const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.post('/add', async (req, res) => {
    try {
        const id = req.query.id;
        const userJson = {
            courses: ["test1", "test2"]
        }
        const userRef = db.collection('courses').doc(id).set(userJson);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
});

app.listen(6000, () => console.log('Example app is listening on port 3000.'));