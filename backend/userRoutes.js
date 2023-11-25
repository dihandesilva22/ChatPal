const express = require('express');
const router = express.Router();
const db = require('./adminSDKConfig');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    try {
        const username = req.body.name;
        const userCollection = db.collection('users');
        userCollection.where('username', '==', username).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    res.status(200).json({ "state": "unsuccessful" });
                } else {
                    userCollection.add({ username: username })
                        .then((useRef) => {
                            console.log("User profile created successfully");
                            // console.log(useRef.data)
                            const payload = {
                                userId: useRef.id,
                                username: username,
                            };

                            // Sign the token with a secret key
                            const token = jwt.sign(payload, 'ChatPal#44', { expiresIn: '30d' });
                            console.log(token);
                            res.status(200).json({ "token": token, "state": "successful" });
                        })
                }
            })
    } catch (error) {
        console.log("There is an error", error);
        res.status(500).json({ "Message": error });
    }
})

module.exports = router;