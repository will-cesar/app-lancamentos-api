import { Request, Response } from 'express';

import { ListUsersService } from '@services/users/list-user';

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();
    const responseUsers = await listUsersService.execute();

    return response.status(responseUsers.statusCode).json(responseUsers);
  } 
}  
