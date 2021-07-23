import { Request, Response } from 'express';

import { UserRequest } from '@interfaces/user-request';
import { UpdateUserService } from '@services/users/update-user';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user: UserRequest = request.body;
    const updateUserService = new UpdateUserService();
    const responseUser = await updateUserService.execute(user);

    return response.status(responseUser.statusCode).json(responseUser);
  }
}
