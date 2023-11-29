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
                            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
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


router.get('/getUser', (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]; // Assuming 'Bearer <token>' format

            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.error('JWT verification error:', err);
                    res.status(401).json({ error: 'Unauthorized' });
                } else {
                    console.log('Decoded JWT payload:', decoded);
                    // Now you can access the decoded payload in 'decoded' variable
                    res.json({ state: 'success' , userID: decoded.userId, username: decoded.username});
                }
            });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.log("There is an error", error);
        res.status(500).json({ "Message": error });
    }
})

module.exports = router;