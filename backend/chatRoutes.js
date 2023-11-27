const express = require('express');
const router = express.Router();
const db = require('./adminSDKConfig');

router.get('/chat-list', (req, res) => {
  try {
    const chatCollection = db.collection('chats');
    chatCollection.get().then(async (snapshot) => {

      let chatList = [];

      if (snapshot.empty) {
        console.log('No documents found in the collection.');
        chatList.push("No chats to show");
      } else {

        for (const doc of snapshot.docs) {
          const chat = {}
          const data = doc.data();

          chat.chatID = doc.id;
          chat.chatName = data.name;
          chat.status = data.status;

          chatList.push(chat);
        }
        res.status(200).json(chatList);
      }
    })

  } catch (error) {
    console.log("An error occured", error);
    res.status(500).json({ "Message": error });
  }
})


router.get('/getStatus', async (req, res) => {
  try {
    const chatID = req.query.chatID;

    const chatSnapshot = await db.collection('chats').doc(chatID).get();

    if (chatSnapshot.exists) {
      console.log(chatSnapshot.data());
      const chatStatus = chatSnapshot.data().status;
      const chatName = chatSnapshot.data().name;
      const admin = chatSnapshot.data().admin;
      const user = await admin.get()
        
      if (!user.exists) {
        console.log('Document not found!');
      } else {
        console.log('Document data:', user.data());
      }
      // console.log(admin.split('/'));
      console.log('Chat Status:', chatStatus);

      res.status(200).json({ status: chatStatus, name: chatName , admin:user.id});
    } else {
      console.log('Cannot get the chat status');
    }

  } catch (error) {
    console.log('An error occurred', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/getAllMessages', (req, res) => {
  try {
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
        } else {
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
  } catch (error) {
    res.status(500).json({ "Message": error });
  }
});



router.post("/saveMessage", (req, res) => {
  try {
    console.log(req.body);
    const userID = req.body.userID;
    const chatID = req.body.chatID;
    const message = req.body.message;
    // console.log(chatID);
    // console.log(chatID.toString());
    const currentTime = new Date();
    console.log(currentTime);
    const chatMessageData = {
      user: db.collection('users').doc(userID),   //userReference
      message: message,
      sentOn: currentTime,
      chat: db.collection('chats').doc(chatID)   //chatReference
    }

    db.collection('chatMessages').add(chatMessageData)
      .then((docRef) => {
        console.log("New document created successfully");
        res.status(200).json({ state: "Successful" });
      })
  } catch (error) {
    console.log("There is an error");
    res.status(500).json({ "Message": error });
  }
});

router.post('/create-chat', (req, res) => {
  try {
    console.log(req.body);
    const chatName = req.body.name;
    const userID = req.body.user;

    const chatCollection = db.collection('chats');
    chatCollection.where('name', '==', chatName).get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          res.status(200).json({ "Message": "This name has used for a previous chat" });
        } else {

          const chatData = {
            name: chatName,
            status: true,
            admin: db.collection('users').doc(userID), //User reference for admin
          }

          chatCollection.add(chatData)

            .then((chatRef) => {
              console.log("Successfully created a new chat");
              // console.log(chatRef.id);
              // console.log(chatRef.admin);
              res.status(200).json({ state: "successful" , chatID : chatRef.id});
            })
        }
      })
  } catch (error) {
    console.log("There is an error", error);
    res.status(500).json({ "Message": error });
  }
})


router.put('/destroy-chat', (req, res) => {
  try {
    const chatID = req.body.id;

    const chatCollection = db.collection('chats');
    chatCollection.where('id', '==', chatID).get()

      .then(() => {
        chatCollection.doc(chatID).update({ status: false })
      })
      .then(() => {
        console.log("Successfully destroyed the chat");
        res.status(200).json({ state: "successful" })
      })
  } catch (error) {
    console.log("There is an error", error);
    res.status(500).json({ "Message": error });
  }
})

module.exports = router;
