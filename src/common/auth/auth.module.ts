import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthController } from './auth.controller';
@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
  constructor(private readonly prismaService: PrismaService) {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.init();
    }, 2000);
  }

  // 初始化auth rbac redis
  async init() {
    const access = await this.prismaService.access.findMany({
      include: {
        AccessRole: {
          include: {
            Roles: {
              include: {
                UserRole: {
                  include: {
                    Users: {
                      select: {
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    // readme redis key 对应数组id
    // console.log(
    //   ` ===============
    //     应用 RBAC access 路由对应用户id成功！
    //     =============== `,
    // );
  }
}
