import { Request, Response } from 'express';

import { UserRequest } from '../models/user-request.model';
import { CreateUserService } from '../services/create-user.service';

export class CreateUserController {  
  async handle(request: Request, response: Response): Promise<any> {

    const user: UserRequest = request.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute(user);
    console.log(newUser);
    return response.json(newUser);
  }
}
