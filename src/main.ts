import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const prisma = new PrismaClient();

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // 访问频率限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 5000, // 限制15分钟内最多只能访问1000次
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // 注册并配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // skipMissingProperties: false,
      // forbidUnknownValues: true,
    }),
  );
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 设置所有 api 访问前缀
  app.setGlobalPrefix('/api');

  if (process.env.NODE_ENV != 'production') {
    // 接口文档 swagger 参数
    const options = new DocumentBuilder()
      .setTitle('jimu-server restful API')
      .setDescription('API 文档')
      .setVersion('1.0')
      .addTag('users')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    // 设置 swagger 网址
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.FC_SERVER_PORT || 9000, '0.0.0.0', async () => {
    console.log(
      ` ===============
    应用文档访问地址 http://localhost:${process.env.FC_SERVER_PORT || 9000}/api
    =============== `,
    );
  });

  // 获取所有路由
  for (const i of app.getHttpAdapter().getInstance()._router.stack) {
    //  console.log('i.route :>> ', i);
    if (i.route) {
      const method = Object.keys(i.route.methods)[0];
      // console.log(i.route.path);
      // 特殊路由过滤
      if (i.route.path === '/api' || i.route.path === '/api-json') {
        continue;
      }
      // console.log("api :>> ", `${method}-${i.route.path}`);
      // 先查路由
      const result = await prisma.access.findMany({
        where: {
          api: `${method}-${i.route.path}`,
          method: method,
        },
      });
      // 存在不动 不存在创建
      if (result.length === 0) {
        await prisma.access.create({
          data: {
            name: `${i.route.path.split('/')[2]}`,
            level: 1000,
            api: `${method}-${i.route.path}`,
            method: method,
          },
        });
      }
    }
  }
}
bootstrap();
