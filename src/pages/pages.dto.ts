// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiProperty } from '@nestjs/swagger';
import { PaltformType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsExactnessTagId } from '../common/dto/custom.dto';

export class PageCreateDto {
  @ApiProperty({ description: 'pageId', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  readonly pageId: string;

  @ApiProperty({ description: 'title', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @ApiProperty({ description: 'type', enum: PaltformType, required: true })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaltformType)
  readonly type: PaltformType;

  @ApiProperty({ description: '数据', type: JSON, required: true })
  @IsJSON()
  @IsNotEmpty()
  readonly data: string;

  @ApiProperty({ description: '版本号', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  readonly version: string;

  @ApiProperty({
    description: '标签id',
    type: [Number],
    required: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Validate(IsExactnessTagId)
  readonly tagId?: number[];
}

export class GetByUserDto {
  @ApiProperty({ description: 'type', enum: PaltformType, required: true })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaltformType)
  readonly type: PaltformType;
}

export class PagesPutRequstBodyDto {
  @ApiProperty({ description: 'type', enum: PaltformType, required: false })
  @IsOptional()
  @IsEnum(PaltformType)
  readonly type?: PaltformType;

  @ApiProperty({ description: 'status', type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;

  @ApiProperty({ description: 'title', type: String, required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title?: boolean;
}

export class PagesIdDto {
  @ApiProperty({ description: 'pageId', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  readonly pageId: string;

  @ApiProperty({ description: 'userId', type: Number, required: true })
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  readonly userId: number;
}

export class PlatformTypeDto {
  @ApiProperty({ description: 'type', enum: PaltformType, required: false })
  @IsOptional()
  @IsEnum(PaltformType)
  readonly type?: PaltformType;
}
