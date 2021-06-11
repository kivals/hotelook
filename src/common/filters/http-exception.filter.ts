import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch()
export class ExceptionLoggerFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('Exception throw ', exception);
    super.catch(exception, host);
  }
}
