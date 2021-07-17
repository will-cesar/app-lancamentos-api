export interface UserRequest {
    id?: string;
    createAt?: Date;
    email: string;
    firstName: string;
    hash?: string;
    isAdmin?: boolean;
    lastName: string; 
    password: string;
    salt?: string;
    updateAt?: Date;
}
