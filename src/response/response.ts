import { HttpStatus } from '@nestjs/common';

export class BaseResponse<T> {
  static ok(data: any, message: string = 'Success', statusCode: number = HttpStatus.OK, pagination?:any) {
    return {
      statusCode,
      message,
      data,
      pagination
    };
  }

  static errorResponse(message: string = 'Internal Server Error', statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    return {
      statusCode,
      message,
    };
  }
  static notFoundResponse(message: string = 'Not Found', statusCode: number = HttpStatus.NOT_FOUND) {
    return {
      statusCode,
      message,
      data:null
    };
  }
  static unauthorizedResponse(message: string = 'Not allowed', statusCode: number = HttpStatus.UNAUTHORIZED) {
    return {
      statusCode,
      message,
    };
  }
}
