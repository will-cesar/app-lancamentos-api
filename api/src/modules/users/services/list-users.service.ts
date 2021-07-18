import { classToPlain } from 'class-transformer';
import { UsersRepositories } from 'repositories/users.repository';
import { getCustomRepository } from 'typeorm';
import SuccessResponse from 'utilities/SuccessResponse';

class ListUsersService {
  async execute(): Promise<SuccessResponse> {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const users = await usersRepositories.find();

    const usersToPain = classToPlain(users);

    return new SuccessResponse(usersToPain, 'Ok');
  }
}

export default ListUsersService;
