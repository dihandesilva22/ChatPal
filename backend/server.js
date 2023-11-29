require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatsRouter = require('./chatRoutes.js');
const userRouter = require('./userRoutes.js');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors());

app.listen(process.env.PORT, ()=> {
  console.log(`App is listening on PORT ${process.env.PORT}`);
})

app.use('/chat',chatsRouter);
app.use('/user',userRouter);

