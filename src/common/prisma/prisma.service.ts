import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log:
        process.env.NODE_ENV !== 'production'
          ? ['error']
          : ['query', 'info', 'warn', 'error'],
    });
  }
  async onModuleInit() {
    // prisma middleware
    // await this.$use(async (params, next) => {
    //   console.log('params :>> ', params);
    //   const before = Date.now();
    //   const result = await next(params);
    //   const after = Date.now();
    //   console.log(
    //     `Query ${params.model}.${params.action} took ${after - before}ms`
    //   );
    //   return result;
    // });

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async OnApplicationShutdown() {
    await this.$disconnect();
  }
}
