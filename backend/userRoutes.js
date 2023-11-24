const express = require('express');
const router = express.Router();
const db = require('./adminSDKConfig');

router.post('/register', (req,res) => {
    try{
        const username = req.body.name;
        const userCollection = db.collection('users');
        userCollection.where('username','==',username).get()
        .then((snapshot)=> {
            if(!snapshot.empty){
                res.status(200).json({"Message":"User with the username already exists"});
            }else{
                userCollection.add({username:username})
                .then((useRef) => {
                    console.log("User profile created successfully");
                    res.status(200).json({"userID":useRef.id});
                })
            }
        })
    }catch(error){
        console.log("There is an error",error);
        res.status(500).json({"Message":error});
    }
})

module.exports = router;