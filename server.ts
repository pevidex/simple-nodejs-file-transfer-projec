const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser')

import routes from './src/api/routes/uploadRoutes'; //importing route

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

app.listen(port);

console.log('Listenning on: ' + port);