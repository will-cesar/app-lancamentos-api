import { Request, Response } from 'express';

import { UserRequest } from '@interfaces/user-request';
import { CreateUserService } from '@services/users/create-user';
 
export class CreateUserController {  
  async handle(request: Request, response: Response): Promise<Response> {
    const user: UserRequest = request.body;
    const createUserService = new CreateUserService();
    const responseUser = await createUserService.execute(user);

    return response.status(responseUser.statusCode).json(responseUser);
  }
}
