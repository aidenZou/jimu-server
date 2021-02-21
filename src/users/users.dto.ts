import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsNumber,
  IsNumberString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsBoolean,
  Min,
  Max,
  ValidateIf,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UsersModelIdDto {
  @ApiProperty({ description: '用户id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly id: number;
}

export class UpsertTdo {
  name: string;
  identifier: string;
  password: string;
  avatar: string;
  sex: number;
  loginType: string;
  application: string;
  createdAt: Date;
  updatedAt: Date;
}

export class TokenUserInfo {
  @ApiProperty({ description: '用户id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly id: number;

  @ApiProperty({ description: '用户名称', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '用户密码', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly password?: string;

  @ApiProperty({ description: '用户生日', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly avatar: string;

  @ApiProperty({ description: '性别', type: Number, required: true })
  @IsInt()
  @IsNotEmpty()
  readonly sex: number;

  @ApiProperty({ description: '更新时间', type: String, required: false })
  readonly updateAt?: string;

  @ApiProperty({ description: '设备', type: String, required: false })
  readonly deviceid?: string;

  @ApiProperty({ description: '创建时间', type: String, required: false })
  readonly createdAt?: string;

  @ApiProperty({ description: '来源渠道', type: String, required: false })
  readonly channel?: string;

  @ApiProperty({ description: 'iat', type: Number, required: false })
  readonly iat?: number | null;

  @ApiProperty({ description: 'iat', type: Number, required: false })
  @IsInt()
  readonly exp?: number | null;
}

// record 需要的user信息
export class RecordNeedUserInfoDto {
  @ApiProperty({ description: '用户id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly id: number;
  @ApiProperty({ description: '用户生日', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly birthday: string;
  @ApiProperty({ description: '性别', type: Number, required: true })
  @IsInt()
  @IsNotEmpty()
  readonly sex: number;
  @ApiProperty({ description: '会员天数', type: Number, required: true })
  @IsInt()
  readonly memberDays: number;
  @ApiProperty({ description: '用户莲花数', type: Number, required: true })
  @IsInt()
  readonly flower: number;
}
export class UsersIdAndUserIdDto {
  @ApiProperty({ description: '用户id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly id: number;

  @ApiProperty({ description: '用户id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly userId: number;
}

// 更新用户会员状态
export class UpdateUserMemberDto {
  @ApiProperty({
    description: '会员状态 0-非会员 1-普通会员',
    type: Number,
    required: true,
  })
  @IsNumber()
  readonly memberFlag: number;
}

export class QueryUsersId {
  @ApiProperty({ description: '用户id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly id: number;
}

export class DeleteUsersId {
  @ApiProperty({ description: '文章和分类id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly id: number;
}

export class ConditionQueryUsers {
  @ApiProperty({ description: '限制条数', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  limit: number;

  @ApiProperty({ description: '偏移条数', type: Number, required: true })
  @IsInt()
  @Transform((value) => {
    return Number(value);
  })
  offset: number;
}

export class UsersFindOneByIdentifierDto {
  @ApiProperty({ description: '用户唯一标识', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  readonly identifier: string;

  // @ApiProperty({ description: "登录方式", type: String, required: true })
  // @IsString()
  // // @IsIn(["mobile", "wechat"])
  // readonly loginType: string;
}

export class UserUpdateDto {
  @ApiProperty({ description: '用户密码', type: String, required: false })
  @ValidateIf((value) => value === undefined)
  @IsString()
  @IsNotEmpty()
  readonly password?: string;

  @ApiProperty({ description: '用户名称', type: String, required: false })
  @ValidateIf((value) => value === undefined)
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @ApiProperty({ description: '用户生日', type: String, required: false })
  @ValidateIf((value) => value === undefined)
  @IsUrl()
  readonly avatar?: string;

  @ApiProperty({
    description: '性别',
    type: Number,
    required: false,
    default: 0,
  })
  @ValidateIf((value) => value === undefined)
  @IsInt()
  readonly sex?: number;
}
