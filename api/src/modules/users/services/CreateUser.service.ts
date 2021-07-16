import { validate } from 'email-validator';
import { Responses } from 'modules/enums/responses.enum';

import { UserRequest } from '../models/user-request.model';

export class CreateUserService {

  async execute(user: UserRequest): Promise<any> {
    // const usersRepository = getCustomRepository(UsersRepositories); 

    const isUserValid = await this.isValid(user);

    if (!isUserValid.isValid) throw new Error(isUserValid.status);

    const newUser = user;

    return newUser;
  }

  isValid(user: UserRequest): any {
    if (!user) return { status: 'INVALID', isValid: false };

    if (!validate(user.email)) return { status: Responses.INVALID_EMAIL, isValid: false };

    if (!user.firstName || user.firstName.length == 0) return { status: 'STATUS.firstName', isValid: false };
  }
}
