import { BadRequestException, Injectable } from '@nestjs/common';
import { Pages } from '@prisma/client';
import { DataBaseId } from '../common/dto/custom.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { TokenUserInfo } from '../users/users.dto';
import { PageCreateDto, PagesIdDto } from './pages.dto';

@Injectable()
export class PagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Pages[]> {
    return this.prismaService.pages.findMany();
  }

  async getAllByUser(tokenUserInfo: TokenUserInfo): Promise<Pages[]> {
    return this.prismaService.pages.findMany({
      where: {
        userId: tokenUserInfo.id,
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

    // if (params.tagId && params.tagId.length) {
    //   ele.data['tags'] = {
    //     connect: params.tagId.map((v: number) => {
    //       return {
    //         tagId: v,
    //       };
    //     }),
    //   };
    // }

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

  delete(dataBaseId: DataBaseId): Promise<Pages> {
    return this.prismaService.pages.delete({
      where: {
        id: dataBaseId.id,
      },
    });
  }
}
