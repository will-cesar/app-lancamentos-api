import { connectToDb } from 'config/db';
import { swaggerDocs } from 'config/swagger';
import cors from 'cors';
import 'reflect-metadata'; 
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
 
const app = express();

app.use(cors());

app.use(express.json()); 

connectToDb(); 

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({ 
      error: err.message,
      statusCode: 400
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
