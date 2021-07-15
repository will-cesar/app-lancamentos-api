import { Request, Response } from 'express';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<any> {
    console.log(request, request.body);
    return response.json(request.body);
  }
}
