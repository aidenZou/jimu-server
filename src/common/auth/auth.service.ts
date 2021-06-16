import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Access, AccessRole, Roles, UserRole, Users } from '@prisma/client';
import {
  CreateAccessRolesDto,
  CreateRolesDto,
  UpdateRolesDto,
  UsersLoginDto,
  UsersMbileDto,
  ValidateUserDto,
  IdDto,
  CreateAccessDto,
  UpdateAccessDto,
  UsersAccountLoginDto,
} from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(param: ValidateUserDto): Promise<any> {
    const user = await this.usersService.findByIdentifier(param);
    if (user) {
      return user;
    }
    return null;
  }

  async accountlogin(param: UsersAccountLoginDto): Promise<string> {
    try {
      const res = await this.prismaService.accounts.findFirst({
        where: {
          identifier: param.identifier,
        },
        include: {
          Users: true,
        },
      });
      return this.getAccessToken(res.Users);
    } catch (error) {
      throw new BadRequestException('查询失败');
    }
  }

  async getAccessToken(user: Users): Promise<string> {
    return this.jwtService.sign(user);
  }

  async hasRoles(
    userId: number,
    method: string,
    url: string,
  ): Promise<boolean> {
    const hasRole = await this.prismaService.roles.findMany({
      where: {
        AccessRole: {
          some: {
            Access: {
              api: url,
            },
            status: true,
          },
        },
        UserRole: {
          some: {
            userId: userId,
          },
        },
      },
    });
    // console.log('hasRole :>> ', hasRole);
    const status = Boolean(hasRole);
    return status;
  }

  async createRoles(createRolesDto: CreateRolesDto): Promise<Roles> {
    return this.prismaService.roles.create({
      data: {
        name: createRolesDto.name,
        level: createRolesDto.level,
      },
    });
  }

  async updateRoles(
    IdDto: IdDto,
    updateRolesDto: UpdateRolesDto,
  ): Promise<Roles> {
    return this.prismaService.roles.update({
      where: {
        id: IdDto.id,
      },
      data: updateRolesDto,
    });
  }

  async roles(): Promise<Roles[]> {
    return this.prismaService.roles.findMany().catch((err) => {
      throw new BadRequestException('查询失败！');
    });
  }

  async accessRoles(): Promise<AccessRole[]> {
    return this.prismaService.accessRole.findMany();
  }

  async createAccessRoles(
    createAccessRolesDto: CreateAccessRolesDto,
  ): Promise<AccessRole[]> {
    const PromiseQueue = [];
    createAccessRolesDto.accessId.map((v) => {
      PromiseQueue.push(
        this.prismaService.accessRole.create({
          data: {
            Access: {
              connect: {
                id: v,
              },
            },
            Roles: {
              connect: {
                id: createAccessRolesDto.rolesId,
              },
            },
          },
        }),
      );
    });

    return Promise.all(PromiseQueue).catch((err) => {
      throw new BadRequestException('创建资源失败！');
    });
  }

  access(): Promise<Access[]> {
    return this.prismaService.access.findMany();
  }

  async createAccess(createAccessDto: CreateAccessDto): Promise<Access> {
    try {
      return this.prismaService.access.create({
        data: {
          name: createAccessDto.name,
          api: createAccessDto.api,
          method: createAccessDto.method,
          level: createAccessDto.level,
        },
      });
    } catch (err) {
      throw new BadRequestException('创建资源失败！');
    }
  }

  async updateAccess(IdDto: IdDto, updateAccessDto: UpdateAccessDto) {
    return this.prismaService.access
      .update({
        where: {
          id: IdDto.id,
        },
        data: updateAccessDto,
      })
      .catch((err) => {
        throw new BadRequestException('更新资源失败！');
      });
  }
}
