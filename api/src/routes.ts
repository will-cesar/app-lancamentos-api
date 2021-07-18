import { Router } from 'express';
import usersRouter from 'modules/users/users.routes';

const routes = Router();

const prefix = 'v1';

routes.use(`/${prefix}/users`, usersRouter);

export default routes;
