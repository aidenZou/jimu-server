import {
  Injectable,
  Inject,
  BadRequestException,
  LoggerService,
  forwardRef,
} from '@nestjs/common';
import {
  UsersModelIdDto,
  TokenUserInfo,
  UpsertTdo,
  UsersFindOneByIdentifierDto,
  UserUpdateDto,
  CreateUserDto,
  CreateAccountsDto,
  CreateAccountsUserDto,
} from './users.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Accounts, Users } from '@prisma/client';
import { ValidateUserDto } from 'src/common/auth/auth.dto';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: CreateAccountsUserDto): Promise<Users> {
    return this.prismaService.accounts
      .create({
        data: {
          identifier: params.identifier,
          loginType: params.loginType,
          application: params.application,
          details: params?.details || {},
          Users: {
            create: {
              name: params.name,
              avatar: params.avatar,
              sex: params.sex,
              password: params.password,
            },
          },
        },
        select: {
          Users: true,
        },
      })
      .then((res) => {
        return res.Users;
      })
      .catch((err) => {
        // console.log('err :>> ', err);
        throw new BadRequestException('创建失败');
      });
  }

  async findAll() {
    return this.prismaService.users.findMany();
  }

  async findOne(usersModelIdDto: UsersModelIdDto): Promise<Users> {
    try {
      const res = await this.prismaService.users.findOne({
        where: {
          id: usersModelIdDto.id,
        },
      });
      return res;
    } catch (error) {
      throw new BadRequestException('查询失败');
    }
  }

  async findByIdentifier(param: ValidateUserDto): Promise<Users> {
    try {
      const res = await this.prismaService.accounts.findOne({
        where: {
          identifier: param.identifier,
        },
        include: {
          Users: true,
        },
      });
      return res.Users;
    } catch (error) {
      throw new BadRequestException('查询失败');
    }
  }

  // async remove(id: number): Promise<void> {
  //   // const user = await this.findOne(id);
  //   // await user.destroy();
  // }

  async upsert(data: UpsertTdo): Promise<Accounts> {
    // 查询是否存在账号
    const result = await this.prismaService.accounts
      .upsert({
        where: {
          identifier: data.identifier,
        },
        select: {
          id: true,
          loginType: true,
          identifier: true,
          application: true,
          details: true,
          createdAt: true,
          updatedAt: true,
          Users: true,
          userId: true,
        },
        // 存在更新
        update: {
          Users: {
            update: {
              password: data.password,
              name: data.name,
              avatar: data.avatar,
              sex: data.sex,
            },
          },
        },
        // 不存在创建
        create: {
          loginType: data.loginType,
          identifier: data.identifier,
          application: data.application,
          Users: {
            create: {
              password: data.password,
              name: data.name,
              avatar: data.avatar,
              sex: data.sex,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            },
          },
        },
      })
      .then((v) => {
        return v;
      });
    return result;
  }

  /**
   * 更新用户信息
   * @param user
   * @param updateInfo
   */
  async update(
    user: UsersModelIdDto,
    updateInfo: UserUpdateDto,
  ): Promise<Users> {
    return await this.prismaService.users
      .update({
        where: {
          id: user.id,
        },
        data: {
          ...updateInfo,
        },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new BadRequestException('更新失败！');
      });
  }
}
