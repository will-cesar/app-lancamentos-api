import { UserResponseMessage } from '@enums/user-response-message';

export interface Validation {
    status: UserResponseMessage;
    isValid: boolean;
}
