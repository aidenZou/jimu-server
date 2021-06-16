import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // 捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    // console.log("ctx", " \n", request.route);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('request :', request.body);
    console.log('exception :', JSON.stringify(exception));
    // @todo 记录日志
    console.log(
      'HttpExceptionFilter ERROR \n',
      // '\n  - 请求地址: ',
      // request.route.path,
      '\n  - 请求方法: ',
      // request.route.methods,
      '\n  - 实际请求地址参数: ',
      request.body,
      '\n',
      request.originalUrl,
      '\n  - 错误信息: \n',
      JSON.stringify(exception.message),
      '\n',
    );
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    // 发送响应
    // response.json({
    //   statusCode: status,
    //   message: exception.message,
    //   path: request.url,
    // });
    let returnMessage: any;
    try {
      returnMessage = JSON.parse(JSON.stringify(exception));
      // console.log('returnMessage :>> ', returnMessage);
    } catch (error) {
      // console.log('error111111111 :>> ', error);
      returnMessage = exception?.message;
    }

    // if (returnMessage.hasOwnProperty("response")) {
    //   if (returnMessage.response.hasOwnProperty("message")) {
    //     returnMessage = returnMessage.response.message;
    //   }
    // }
    // console.log('returnMessage :>> ', returnMessage);
    // {"response":{"statusCode":400,"message":"请求出错,请重试！","error":"Bad Request"},"status":400,"message":"请求出错,请重试！"}
    response.json({
      // message: '请求失败',
      code: 0, // 自定义code
      // url: request.originalUrl, // 错误的url地址
      data: {
        error: returnMessage?.response?.message,
      }, // 获取全部的错误信息
    });
  }
}
