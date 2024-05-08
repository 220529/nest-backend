import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // 获取异常中定义的响应信息
    const exceptionResponse = exception.getResponse();

    // 设置默认状态码和响应内容
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let content: { message?: string } = { message: 'Internal server error' };

    // 如果异常中定义了响应信息，则使用异常中定义的状态码和消息
    if (typeof exceptionResponse === 'object') {
      content = exceptionResponse;
    } else if (typeof exceptionResponse === 'string') {
      content.message = exceptionResponse;
    }

    // 构建返回的响应体
    const responseBody = {
      ...content,
      state: 0,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    // 发送响应给客户端
    response.status(status).json(responseBody);
  }
}
