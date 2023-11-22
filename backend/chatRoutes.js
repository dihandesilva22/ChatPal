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

router.get('/getAllMessages', (req, res) => { 
  try{
    // const chatID = "hscUcabi8UpRSC132egZ";
    // console.log(req.query.ID);
    const chatID = req.query.ID;
    
    const chatRef = db.collection('chats').doc(chatID);
    const chatMessagesRef = db.collection('chatMessages');

    chatMessagesRef.where('chat', '==', chatRef).orderBy('sentOn').get()
    .then(async (snapshot) => {
      let chatMessages = [];
      if (snapshot.empty) {
        console.log('No documents found in the collection.');
        chatMessages.push("No documents found in the collection.");
      }else{
        // Iterate through each document
        for (const doc of snapshot.docs) {
          // Get all fields for each document
          const msgDetails = {};
          const data = doc.data();
          msgDetails.content = data.message;
          const sentDate = new Date(data.sentOn._seconds * 1000 + data.sentOn._nanoseconds / 1e6);
          // Get the UTC time in milliseconds
          const utcTime = sentDate.getTime();

          // Calculate the offset in minutes
          const offsetInMinutes = -(new Date().getTimezoneOffset());
          const adjustedTime = utcTime + offsetInMinutes * 60 * 1000;
          const adjustedDate = new Date(adjustedTime);
          // console.log(adjustedDate.toLocaleDateString());
          msgDetails.timeStamp = adjustedDate;

          const userDoc = await data.user.get();
          const username = userDoc.get('username');
          msgDetails.user = username;
          chatMessages.push(msgDetails);
          // console.log(referencedData1);
        }

        res.status(200).json(chatMessages);
        // console.log(chatMessages);
      }
  })
  }catch(error){
    res.status(500).json({"Message":error});
  }
});



router.post("/saveMessage",(req,res)=>{
try{
  console.log(req.body);
  const userID = req.body.userID;
  const chatID = req.body.chatID;
  const message = req.body.message;

  const currentTime = new Date();
  console.log(currentTime);
  // Convert JavaScript Date object to Firestore timestamp
  const sentTime = admin.firestore.Timestamp.fromDate(currentTime);
  console.log(sentTime);
  const chatMessageData = {
    user : db.collection('users').doc(userID),
    message : message,
    sentOn : sentTime,
    chat : db.collection('chats').doc(chatID)
  }

  db.collection('chatMessages').add(chatMessageData)
  .then((docRef) => {
    console.log("New document created successfully");
    res.status(200).json(docRef.id);
  })
}catch(error){
  console.log("There is an error");
  res.status(500).json({"Message":error});
}
});

module.exports = router;
