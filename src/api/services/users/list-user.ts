import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UsersRepositories } from '@repositories/users';
import { SuccessResponse } from '@validations/success-response';

export class ListUsersService {

  async execute(): Promise<SuccessResponse> {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const users = await usersRepositories.find();
    const usersToPain = await classToPlain(users);

    return new SuccessResponse(usersToPain, 'Ok');
  }
  
}
