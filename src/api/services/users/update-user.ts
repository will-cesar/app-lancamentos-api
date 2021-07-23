import { getCustomRepository } from 'typeorm';

import { UserResponseMessage } from '@enums/user-response-message';
import { UserRequest } from '@interfaces/user-request';
import { UsersRepositories } from '@repositories/users';
import { SharedMethodsUsers } from '@shared/shared-methods';
import { SuccessResponse } from '@validations/success-response';
import { ValidationError } from '@validations/validation-error';

const sharedMethods = new SharedMethodsUsers();

export class UpdateUserService {
  async execute(user: UserRequest): Promise<SuccessResponse | ValidationError>{
    const usersRepository = getCustomRepository(UsersRepositories);

    const isUserValid = await sharedMethods.isValid(user);

    if (!isUserValid.isValid) throw new ValidationError(isUserValid.status, 400);

    const userExist = sharedMethods.getUserById(user.id);

    if (!userExist) throw new ValidationError(UserResponseMessage.USER_NOT_FOUND, 400);

    await usersRepository.update(user.id, user);

    return new SuccessResponse(user, UserResponseMessage.UPDATE_SUCCESS);
  }
}
