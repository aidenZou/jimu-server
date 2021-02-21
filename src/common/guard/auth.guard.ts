import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { Reflector } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard :>> ');
    // 非权限接口直接返回
    //  https://docs.nestjs.com/security/authentication
    // @NoAuth()
    // @Get()
    // findAll() {
    //   return [];
    // }
    const request = context.switchToHttp().getRequest();
    let accessToken =
      request.header('Authorization') ||
      request.query.token ||
      request.body.token;
    if (!accessToken) {
      return false;
    }

    if (accessToken.indexOf('Bearer') !== -1) {
      accessToken = accessToken.replace('Bearer ', '');
    }

    // 验证是否是本应用签发的token 否会直接抛错
    jwt.verify(
      accessToken,
      this.configService.get<string>('JWT_ACCESS_SECRET'),
    );
    // base64解析
    const identifier: any = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString('utf-8'),
    );
    console.log('identifier :>> ', identifier);
    // 是否能解析出信息
    if (!identifier) {
      return false;
    }
    // 是否过期
    if (moment().unix() > identifier.exp) {
      console.log('token过期');
      return false;
    }
    request.user = identifier;
    console.log('======== token AuthGuard 验证成功 =========');
    return true;
  }
}
