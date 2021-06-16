import { BadRequestException, Injectable } from '@nestjs/common';
import { Pages } from '@prisma/client';
import { DataBaseId } from '../common/dto/custom.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { TokenUserInfo } from '../users/users.dto';
import { PageCreateDto, PagesIdDto, PlatformTypeDto } from './pages.dto';

@Injectable()
export class PagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Pages[]> {
    return this.prismaService.pages.findMany({
      select: {
        id: true,
        pageId: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        tags: true,
        PagesData: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        Application: true,
        Users: true,
        userId: true,
        status: true,
        applicationId: true,
      },
    });
  }

  async getAllByUser(
    tokenUserInfo: TokenUserInfo,
    param: PlatformTypeDto,
  ): Promise<Pages[]> {
    return this.prismaService.pages.findMany({
      where: {
        userId: tokenUserInfo.id,
        type: param.type,
      },
    });
  }

  async create(
    tokenUserInfo: TokenUserInfo,
    params: PageCreateDto,
  ): Promise<Pages> {
    const ele = {
      data: {
        pageId: params.pageId,
        title: params.title,
        Users: {
          connect: {
            id: tokenUserInfo.id,
          },
        },
        type: params.type,
        PagesData: {
          create: {
            data: params.data,
            version: params.version,
            Users: {
              connect: {
                id: tokenUserInfo.id,
              },
            },
          },
        },
      },
    };

    if (params.tagId && params.tagId.length) {
      ele.data['tags'] = {
        connect: params.tagId.map((v: number) => {
          return {
            tagId: v,
          };
        }),
      };
    }

    try {
      return this.prismaService.pages.create(ele);
    } catch (err) {
      throw new BadRequestException('创建失败！');
    }
  }

  async getOne(param: PagesIdDto): Promise<Pages> {
    try {
      return this.prismaService.pages.findFirst({
        where: {
          pageId: param.pageId,
        },
      });
    } catch (err) {
      throw new BadRequestException('获取失败！');
    }
  }

  async findOne(param: PagesIdDto): Promise<Pages> {
    try {
      return this.prismaService.pages.findFirst({
        where: {
          pageId: param.pageId,
          userId: param.userId,
        },
      });
    } catch (err) {
      throw new BadRequestException('获取失败！');
    }
  }

  put(pagesPutId: PagesIdDto, data: any): Promise<Pages> {
    return this.prismaService.pages.update({
      where: {
        pageId: pagesPutId.pageId,
      },
      data: {
        title: data.title,
        status: data.status,
        type: data.type,
      },
    });
  }

  async delete(dataBaseId: DataBaseId): Promise<Pages> {
    try {
      await this.prismaService.pagesData.deleteMany({
        where: {
          Pages: {
            id: dataBaseId.id,
          },
        },
      });
      return this.prismaService.pages.delete({
        where: {
          id: dataBaseId.id,
        },
      });
    } catch (error) {
      throw new BadRequestException('删除失败');
    }
  }
}
