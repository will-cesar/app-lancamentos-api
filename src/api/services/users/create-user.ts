import { pbkdf2Sync, randomBytes } from 'crypto';
import { validate } from 'email-validator';
import { getCustomRepository } from 'typeorm';

import { UserResponseMessage } from '@enums/user-response-message';
import { GeneratePassword } from '@interfaces/generate-password';
import { UserRequest } from '@interfaces/user-request';
import { Validation } from '@interfaces/validation';
import { UsersRepositories } from '@repositories/users';
import { SuccessResponse } from '@validations/success-response';
import { ValidationError } from '@validations/validation-error';

export class CreateUserService {

  private async checkIfUserExists(email: string): Promise<boolean> {
    const usersRepository = getCustomRepository(UsersRepositories); 
    const user = await usersRepository.findOne({ email });
    return user ? true : false;
  }

  async execute(user: UserRequest): Promise<SuccessResponse | UserResponseMessage> {
    const usersRepository = getCustomRepository(UsersRepositories); 

    const isUserValid = await this.isValid(user);

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

  private isPasswordValid(password: string): boolean {
    return password
            && password.length >= 8     
            && /[A-Z]/g.test(password)  
            && /[0-9]/g.test(password);  
  }
  
  private isValid(user: UserRequest): Validation {
    if (!user) return { status: UserResponseMessage.INVALID_USER, isValid: false };

    if (!validate(user.email)) return { status: UserResponseMessage.INVALID_EMAIL, isValid: false };

    if (!user.firstName || user.firstName.length == 0) return { status: UserResponseMessage.INVALID_FIRST_NAME, isValid: false };

    if (!this.isPasswordValid(user.password)) return { status: UserResponseMessage.INVALID_PASSWORD, isValid: false };

    return { status: UserResponseMessage.VALID, isValid: true };
  }  
  
}
