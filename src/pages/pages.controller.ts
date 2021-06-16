import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Pages } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { DataBaseId } from '../common/dto/custom.dto';
import {
  PageCreateDto,
  PagesIdDto,
  PagesPutRequstBodyDto,
  PlatformTypeDto,
} from './pages.dto';
import { PagesService } from './pages.service';
import { Visiter } from '../common/decorator/user.decorator';
import { TokenUserInfo } from '../users/users.dto';

@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @ApiOperation({ summary: '管理员接口 获取所有pages' })
  @ApiResponse({
    status: 200,
    description: '管理员接口 获取所有pages',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //   @Header('Cache-Control', 'private, max-age=60')
  get(): Promise<Pages[]> {
    return this.pagesService.getAll();
  }

  @Get('/platform/:type')
  @ApiOperation({ summary: '用户接口 获取当前用户指定platform的pages' })
  @ApiResponse({
    status: 200,
    description: '用户接口 获取当前用户指定platform的pages',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  //   @Header('Cache-Control', 'private, max-age=60')
  getByUser(
    @Visiter() tokenUserInfo: TokenUserInfo,
    @Param() param: PlatformTypeDto,
  ): Promise<Pages[]> {
    return this.pagesService.getAllByUser(tokenUserInfo, param);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '通用接口 创建page数据' })
  @ApiResponse({
    status: 200,
    description: '通用接口 创建page数据',
  })
  @UseGuards(JwtAuthGuard)
  //   @Header('Cache-Control', 'private, max-age=60')
  create(
    @Visiter() tokenUserInfo: TokenUserInfo,
    @Body() body: PageCreateDto,
  ): Promise<Pages> {
    return this.pagesService.create(tokenUserInfo, body);
  }

  @Get('/page/:id')
  @ApiOperation({ summary: '管理员接口 获取单个page' })
  @ApiResponse({
    status: 200,
    description: '管理员接口 获取单个page',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //   @Header('Cache-Control', 'private, max-age=60')
  findOne(@Param() param: PagesIdDto): Promise<Pages> {
    return this.pagesService.getOne(param);
  }

  @Get('/:userId/:pageId')
  @ApiOperation({ summary: '用户接口 获取单个page' })
  @ApiResponse({
    status: 200,
    description: '用户接口 获取单个page',
  })
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  //   @Header('Cache-Control', 'private, max-age=60')
  userfindOne(@Param() param: PagesIdDto): Promise<Pages> {
    return this.pagesService.findOne(param);
  }

  @Put('/:userId/:pageId')
  @ApiOperation({ summary: '通用接口 更新page页数据' })
  @ApiResponse({
    status: 200,
    description: '更新page页数据',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  //   @Header('Cache-Control', 'private, max-age=60')
  put(
    @Param() param: PagesIdDto,
    @Body() body: PagesPutRequstBodyDto,
  ): Promise<Pages> {
    return this.pagesService.put(param, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: '通用接口 删除pages数据' })
  @ApiResponse({
    status: 200,
    description: '删除pages数据',
  })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  //   @Header('Cache-Control', 'private, max-age=60')
  del(@Param() param: DataBaseId): Promise<Pages> {
    return this.pagesService.delete(param);
  }
}
