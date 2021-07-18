import { Router } from 'express';

import CreateUserController from './controllers/create-user.controller';
import ListUsersController from './controllers/list-users.controller';

const usersRouter = Router();

const createUserControler = new CreateUserController();
const listUsersControler = new ListUsersController();

usersRouter.get('/', listUsersControler.handle);
usersRouter.post('/', createUserControler.handle);

export default usersRouter;
