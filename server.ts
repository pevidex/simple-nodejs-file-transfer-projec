import express from 'express';
import routes from './src/api/routes/uploadRoutes'; //importing route

const app = express(),
      port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app); //register the route
app.listen(port);

console.log('Listenning on: ' + port);