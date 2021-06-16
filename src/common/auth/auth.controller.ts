import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Access, AccessRole, Roles } from '@prisma/client';
import { TokenUserInfo } from '../../users/users.dto';
import { Visiter } from '../decorator/user.decorator';
import { RolesGuard } from '../guard/roles.guard';
import {
  UsersMbileDto,
  UsersLoginDto,
  CreateRolesDto,
  UpdateRolesDto,
  CreateAccessRolesDto,
  IdDto,
  CreateAccessDto,
  UpdateAccessDto,
  UsersAccountLoginDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/login')
  @ApiOperation({ summary: '手机号登录' })
  @ApiResponse({
    status: 200,
    description: '登录',
  })
  @Header('Cache-Control', 'private, max-age=60')
  smslogin(@Body() usersLoginDto: UsersLoginDto) {
    // return this.authService.smslogin(usersLoginDto);
  }

  @Post('/identifier/login')
  @ApiOperation({ summary: '账号登录' })
  @ApiResponse({
    status: 200,
    description: '账号登录',
  })
  @Header('Cache-Control', 'private, max-age=60')
  accountlogin(@Body() usersAccountLoginDto: UsersAccountLoginDto) {
    return this.authService.accountlogin(usersAccountLoginDto);
  }

  @Get('/roles')
  @ApiOperation({ summary: '获取角色列表' })
  @ApiResponse({
    status: 200,
    description: '获取角色列表',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  roles(@Visiter() tokenUserInfo: TokenUserInfo): Promise<Roles[]> {
    return this.authService.roles();
  }

  @Post('/roles')
  @ApiOperation({ summary: '创建角色' })
  @ApiResponse({
    status: 201,
    description: '创建角色',
  })
  @Header('Cache-Control', 'private, max-age=60')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  createRoles(@Body() createRolesDto: CreateRolesDto): Promise<Roles> {
    return this.authService.createRoles(createRolesDto);
  }

  @Put('/roles/:id')
  @ApiOperation({ summary: '修改角色详情' })
  @ApiResponse({
    status: 200,
    description: '修改角色详情',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  updateRoles(
    @Param() IdDto: IdDto,
    @Body() updateRolesDto: UpdateRolesDto,
  ): Promise<Roles> {
    return this.authService.updateRoles(IdDto, updateRolesDto);
  }

  @Get('/accessRoles')
  @ApiOperation({ summary: '获取角色权限列表' })
  @ApiResponse({
    status: 200,
    description: '获取角色权限列表',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  accessRoles(@Visiter() tokenUserInfo: TokenUserInfo): Promise<AccessRole[]> {
    return this.authService.accessRoles();
  }

  @Post('/accessRoles')
  @ApiOperation({ summary: '配置角色权限' })
  @ApiResponse({
    status: 201,
    description: '配置角色权限',
  })
  @Header('Cache-Control', 'private, max-age=60')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  createAccessRoles(
    @Body() createAccessRolesDto: CreateAccessRolesDto,
  ): Promise<AccessRole[]> {
    return this.authService.createAccessRoles(createAccessRolesDto);
  }

  @Put('/accessRoles/:id')
  @ApiOperation({ summary: '修改角色详情' })
  @ApiResponse({
    status: 200,
    description: '修改角色详情',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  updateAccessRoles(
    @Param() IdDto: IdDto,
    // @Body() updateRolesDto: UpdateAccessRolesDto
  ) {
    // return this.authService.updateAccessRoles(IdDto, updateRolesDto);
  }

  @Get('/access')
  @ApiOperation({ summary: '获取受限资源列表' })
  @ApiResponse({
    status: 200,
    description: '获取获取受限资源列表',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  access(@Visiter() tokenUserInfo: TokenUserInfo): Promise<Access[]> {
    return this.authService.access();
  }

  @Post('/access')
  @ApiOperation({ summary: '创建需要权限的资源' })
  @ApiResponse({
    status: 201,
    description: '创建需要权限的资源',
  })
  @Header('Cache-Control', 'private, max-age=60')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  createAccess(@Body() createAccessDto: CreateAccessDto): Promise<Access> {
    return this.authService.createAccess(createAccessDto);
  }

  @Put('/access/:id')
  @ApiOperation({ summary: '修改资源详情' })
  @ApiResponse({
    status: 200,
    description: '修改资源详情',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  updateAccess(
    @Param() IdDto: IdDto,
    @Body() updateAccessDto: UpdateAccessDto,
  ) {
    return this.authService.updateAccess(IdDto, updateAccessDto);
  }

  @Get('/userRole')
  @ApiOperation({ summary: '获取用户角色列表' })
  @ApiResponse({
    status: 200,
    description: '获取用户角色列表',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  userRole(@Visiter() tokenUserInfo: TokenUserInfo) {
    // return this.authService.userRole();
  }

  @Post('/userRole')
  @ApiOperation({ summary: '创建需要权限的资源' })
  @ApiResponse({
    status: 201,
    description: '创建需要权限的资源',
  })
  @Header('Cache-Control', 'private, max-age=60')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  createUserRole(@Body() createRolesDto: CreateRolesDto) {
    // return this.authService.createUserRole(createRolesDto);
  }

  @Put('/userRole/:id')
  @ApiOperation({ summary: '修改角色详情' })
  @ApiResponse({
    status: 200,
    description: '修改角色详情',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'private, max-age=60')
  updateUserRole(
    @Param() IdDto: IdDto,
    // @Body() updateRolesDto: UpdateAccessRolesDto
  ) {
    // return this.authService.updateUserRole(rolesIdDto, updateRolesDto);
  }
}
