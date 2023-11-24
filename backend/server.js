const express = require('express');
<<<<<<< Updated upstream
const router = require('./routes.js');
=======
const userRouter = require('./userRoutes.js');
const chatsRouter = require('./chatRoutes.js');

>>>>>>> Stashed changes

const app = express();
const port = 4000;

app.listen(port, ()=> {
  console.log('App is listening on PORT '+port);
})

<<<<<<< Updated upstream
app.use('/',router);



=======
app.use('/user',userRouter);
app.use('/chat',chatsRouter);
>>>>>>> Stashed changes
