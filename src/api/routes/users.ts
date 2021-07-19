
import { Router } from 'express';

import { CreateUserController } from '@controllers/users/create-user';
import { ListUsersController } from '@controllers/users/list-user';

const usersRouter = Router();

const createUserControler = new CreateUserController();
const listUsersControler = new ListUsersController();

usersRouter.get('/', listUsersControler.handle);
usersRouter.post('/', createUserControler.handle);

export default usersRouter;
