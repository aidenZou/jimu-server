import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Param,
  BadRequestException,
  Header,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiMethodNotAllowedResponse,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Visiter } from 'src/common/decorator/user.decorator';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Users } from '@prisma/client';

import { Request } from 'express';
import {
  UsersModelIdDto,
  TokenUserInfo,
  UsersFindOneByIdentifierDto,
  CreateUserDto,
  CreateAccountsDto,
  CreateAccountsUserDto,
} from './users.dto';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({
    status: 201,
    description: '创建用户',
  })
  @Header('Cache-Control', 'private, max-age=120')
  register(@Body() createAccountsUserDto: CreateAccountsUserDto) {
    return this.usersService.create(createAccountsUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({
    status: 200,
    description: '获取用户信息',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAll(@Req() req: Request) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个用户信息' })
  @ApiResponse({
    status: 200,
    description: '获取单个用户信息',
  })
  async getOne(
    @Visiter() user: TokenUserInfo,
    @Query() usersIdDto: UsersModelIdDto,
  ): Promise<Users> {
    return this.usersService.findFirst(usersIdDto);
  }

  @Get('/find/:identifier')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({
    status: 200,
    description: '获取用户信息',
  })
  findOneByIdentifier(
    @Param() usersFindOneByIdentifierDto: UsersFindOneByIdentifierDto,
  ) {
    return this.usersService.findByIdentifier(usersFindOneByIdentifierDto);
  }

  @Get('currentUser')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({
    status: 200,
    description: '获取当前用户信息',
  })
  currentUser(@Visiter() tokenUserInfo: TokenUserInfo) {
    return tokenUserInfo;
  }
}
