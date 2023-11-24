const express = require('express');
const cors = require('cors');
const chatsRouter = require('./chatRoutes.js');
const userRouter = require('./userRoutes.js');

const app = express();
const port = 4000;

app.use(express.json()); // for parsing application/json
app.use(cors());

app.listen(port, ()=> {
  console.log('App is listening on PORT '+port);
})

app.use('/chat',chatsRouter);
app.use('/user',userRouter);

