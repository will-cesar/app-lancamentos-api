import { Request, Response } from 'express';

import ListUsersService from '../services/list-users.service';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<unknown> {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();

    return response.json(users);
  } 
}  

export default ListUsersController;
