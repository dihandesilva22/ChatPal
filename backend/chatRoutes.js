const express = require('express');
const router = express.Router();
const db = require('./adminSDKConfig');

router.use(express.json());

router.post('/create-chat', (req, res) => {
    try{
        const chatName = req.body.name;
        const userID = req.body.userID;

        const chatCollection = db.collection('chats');
        chatCollection.where('name', '==', chatName).get()
        .then((snapshot) => {
            if(!snapshot.empty){
                res.status(200).json({"Message": "This name has used for a previous chat"});
            }else{

                const chatData = {
                    name : chatName,
                    status : true,
                    admin : db.collection('users').doc(userID), //User reference for admin
                  }

                chatCollection.add(chatData)

                .then((chatRef) => {
                    console.log("Successfully created a new chat");
                    // console.log(chatRef.id);
                    // console.log(chatRef.admin);
                    res.status(200).json({"chatID": chatRef.id});
                })
            }
        })
    }catch(error){
        console.log("There is an error", error);
        res.status(500).json({"Message":error});
    }
})

module.exports = router;
