
import { Request, Response } from 'express';

import { UserRequest } from '@interfaces/user-request';
import { CreateUserService } from '@services/users/create-user';
import { SuccessResponse } from '@validations/success-response';
import { ValidationError } from '@validations/validation-error';

export class CreateUserController {  
  async handle(request: Request, response: Response): Promise<any | SuccessResponse | ValidationError> {

    const user: UserRequest = request.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute(user);

    return response.json(newUser);
  }
}
