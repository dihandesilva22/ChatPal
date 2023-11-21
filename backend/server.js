const express = require('express');
const router = require('./routes.js');

const app = express();
const port = 4000;

app.listen(port, ()=> {
  console.log('App is listening on PORT '+port);
})

app.use('/',router);



