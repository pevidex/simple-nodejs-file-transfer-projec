import express from 'express';
import routes from './src/api/routes/uploadRoutes'; //importing route
import {initDbService} from './src/services/db/mongoDbService'

const app = express(),
      port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initDbService();

routes(app); //register the route
app.listen(port);

console.log('Listenning on: ' + port);