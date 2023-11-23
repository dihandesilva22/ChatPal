const express = require('express');
const chatsRouter = require('./chatRoutes.js');
const cors = require('cors');
const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

app.listen(port, ()=> {
  console.log('App is listening on PORT '+port);
})

app.use('/chat',chatsRouter);



