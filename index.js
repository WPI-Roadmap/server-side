const express = require('express');

const app = express();

// Required for side-effects

const admin = require('firebase-admin');
const credientials = require("./key.json");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

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

app.post('/user', async (req, res) => {
  try {
    const id = req.query.id;
    console.log(req.body);
    const userJson = {
      name: req.body.first,
      email: req.body.email,
      last: req.body.last,
      year: req.body.year,
      major: req.body.major,
    }

    const userRef = db.collection('users').doc(id).set({
        name: req.body.first,
        email: req.body.email,
        last: req.body.last,
        year: req.body.year,
        major: req.body.major,
      });
    res.send({
        "status": "success"
    })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

app.post('/add', async (req, res) => {
  try {
    const id = req.query.id;
    const userJson = {
      courses: req.body.courses,
    }
    console.log(userJson)
    const userRef = db.collection('users').doc(id).update({courses: req.body.courses});
    res.send({
        "status": 200
    })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

app.get('/retrieve', (req, res) => {
  try {
    const id = req.query.id;

    console.log(id);
    let userRef = "hi";
    db.collection('users').doc(id).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            userRef = doc.data();
            res.send({
                "status": 200,
                "data": doc.data()
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            res.send({
                "status": 404
            })
        }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    
  } catch (e) {
    console.error("Error retrieving courses: ", e);
  }
})

app.listen(8000, () => console.log('Example app is listening on port 8000.'));