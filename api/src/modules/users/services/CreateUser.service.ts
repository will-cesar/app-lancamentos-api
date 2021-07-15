import { UsersRepositories } from '@repositories/Users.repository';
import { getCustomRepository } from 'typeorm';

export class CreateUserService {

  async execute(user) {
    console.log(user);
    // const usersRepository = getCustomRepository(UsersRepositories);
  }
}
