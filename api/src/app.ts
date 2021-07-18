import connectToDb from 'config/db';
import cors from 'cors';
import 'reflect-metadata';  
import express from 'express';  
import 'express-async-errors';   
import errorValidator from 'middlewares/error-validator';
import routes from 'routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from 'swagger.json';

const app = express();

app.use(cors());

app.use(express.json()); 

connectToDb(); 

app.use(routes);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorValidator);

export default app;
