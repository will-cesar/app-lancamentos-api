
import { Request, Response } from 'express';
import SuccessResponse from 'utilities/SuccessResponse';
import ValidationError from 'utilities/ValidationError';

import { UserRequest } from '../models/user-request.model';
import CreateUserService from '../services/create-user.service';

class CreateUserController {  
  async handle(request: Request, response: Response): Promise<any | SuccessResponse | ValidationError> {

    const user: UserRequest = request.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute(user);

    return response.json(newUser);
  }
}

export default CreateUserController;
