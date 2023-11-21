const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

//initialize the admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//get access to the firebase database
const db = admin.firestore();

module.exports = router;
