const express = require('express');
const chatsRouter = require('./chatRoutes.js');

const app = express();
const port = 4000;

app.use(express.json()); // for parsing application/json

app.listen(port, ()=> {
  console.log('App is listening on PORT '+port);
})

app.use('/chat',chatsRouter);



