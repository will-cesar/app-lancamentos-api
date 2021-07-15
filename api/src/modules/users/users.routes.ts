import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUser.controller';

const usersRouter = Router();

const createUserControler = new CreateUserController();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     description: Test Create User description 1
 *     tags: ['Users']
 *     responses:
 *       200:
 *         description: Test Create User description 2
 */
usersRouter.post('/', createUserControler.handle);

export default usersRouter;
