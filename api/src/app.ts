import * as express from 'express';
import * as cors from 'cors';
import { Response } from 'express';

export const app = express();

app.use(cors());

app.use(express.json());

app.use('/', (_, res: Response) => {
    res.send('API - APP Lançamentos');
});