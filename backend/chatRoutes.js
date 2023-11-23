const express = require('express');
const router = express.Router();
const db = require('./adminSDKConfig');

router.get('/chat-list', (req, res) => {
    try {
        const chatCollection = db.collection('chats');
        chatCollection.get().then(async(snapshot) => {

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

module.exports = router;