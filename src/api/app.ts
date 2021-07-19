import cors from 'cors';
import express from 'express';
import 'express-async-errors';   
import swaggerUi from 'swagger-ui-express'; 
import 'reflect-metadata';  

import { connectToDb } from '@config/database-config';
import swaggerDocs from '@config/swagger.json';
import { errorValidator } from '@middlewares/error-validator';

import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json()); 

connectToDb(); 

app.use(routes);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorValidator);

export default app;
