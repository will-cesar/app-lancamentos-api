import { pbkdf2Sync, randomBytes } from 'crypto';
import { getCustomRepository } from 'typeorm';

import { UserResponseMessage } from '@enums/user-response-message';
import { GeneratePassword } from '@interfaces/generate-password';
import { UserRequest } from '@interfaces/user-request';
import { UsersRepositories } from '@repositories/users';
import { SharedMethodsUsers } from '@shared/shared-methods';
import { SuccessResponse } from '@validations/success-response';
import { ValidationError } from '@validations/validation-error';

const sharedMethods = new SharedMethodsUsers();

export class CreateUserService {

  private async checkIfUserExists(email: string): Promise<boolean> {
    const usersRepository = getCustomRepository(UsersRepositories); 
    const user = await usersRepository.findOne({ email });
    return user ? true : false;
  }

  async execute(user: UserRequest): Promise<SuccessResponse | ValidationError> {
    const usersRepository = getCustomRepository(UsersRepositories); 

    const isUserValid = await sharedMethods.isValid(user);

    if (!isUserValid.isValid) throw new ValidationError(isUserValid.status, 400);
    
    const userAlreadyExists = await this.checkIfUserExists(user.email);

    if (userAlreadyExists) throw new ValidationError(UserResponseMessage.USER_ALREADY_EXISTS, 400);

    const { hash, salt } = await this.generatePassword(user.password);

    user.hash = hash;
    user.salt = salt;
    delete user.password;

    if (user.isAdmin === undefined) user.isAdmin = false;

    const newUser = usersRepository.create(user);

    await usersRepository.save(newUser);

    return new SuccessResponse(newUser, UserResponseMessage.SUCCESS_CREATED, 201); 
  }

  private generatePassword(password: string): GeneratePassword {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { hash, salt };
  }  
}
