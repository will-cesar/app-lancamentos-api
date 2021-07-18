import { NextFunction, Request, Response } from 'express';
import ValidationError from 'utilities/ValidationError';

function errorValidator(
  err: ValidationError,
  request: Request,
  response: Response,
  next: NextFunction
): any {
  if (err instanceof ValidationError) {
    return response.status(err.statusCode).json({ 
      data: null,
      message: err.message,
      statusCode: err.statusCode,
      success: false
    });
  }

  return response.status(500).json({
    data: null,
    message: 'Internal Server Error',
    statusCode: 500,
    success: false
  });
}

export default errorValidator;
