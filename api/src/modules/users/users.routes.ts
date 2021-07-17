import { Router } from 'express';

import { CreateUserController } from './controllers/create-user.controller';

const usersRouter = Router();

const createUserControler = new CreateUserController();

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - firstName
*         - lastName      
*         - password
*       properties:
*         id:
*           type: string
*           description: The auto-generated id of user
*         createAt:
*           type: Date
*           description: Creation date of user
*         email:
*           type: string
*           description: E-mail of user
*         firstName:
*           type: string
*           description: First name of user
*         lastName:
*           type: string
*           description: Last name of user
*         password:
*           type: string
*           description: Password of user
*         updateAt:
*           type: Date
*           description: Last update of user
*       example:
*         email: email@email.com
*         firstName: Wilson
*         lastName: Klother
*         password: mypassword123
*/

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user.
 *     description: This route is responsible to create a new user.
 *     tags: ['Users']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request. Some data is invalid!
 *       500:
 *         description: Server error.
 *                 
 */
usersRouter.post('/', createUserControler.handle);

export default usersRouter;
