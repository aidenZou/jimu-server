import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 自定义装饰器
 */
export const Visiter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
