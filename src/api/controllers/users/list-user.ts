import { Request, Response } from 'express';

import { ListUsersService } from '@services/users/list-user';

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<unknown> {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();

    return response.json(users);
  } 
}  
