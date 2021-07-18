class SuccessResponse {

  data: any;
  message: string;
  statusCode: number;
  success: boolean;

  constructor(
    data: any,
    message: string,
    statusCode?: number
  ){
    this.data = data;
    this.message = message;
    this.statusCode = statusCode ? statusCode : 200;
    this.success = true;
  }
}

export default SuccessResponse;
