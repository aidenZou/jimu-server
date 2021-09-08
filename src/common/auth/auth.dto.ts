import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  Matches,
  IsNumberString,
  IsInt,
  Min,
  Max,
  IsPositive,
  IsMobilePhone,
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class UsersMbileDto {
  @ApiProperty({ description: '用户手机号', type: String, required: true })
  @IsMobilePhone('zh-CN')
  readonly mobile: string;
}

export class UsersAccountLoginDto {
  @ApiProperty({
    description: '用户账号唯一标识',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly identifier: string;

  @ApiProperty({ description: '用户密码', type: String, required: true })
  @IsNumberString()
  @MinLength(9)
  @MaxLength(100)
  readonly password: string;
}
export class UsersLoginDto {
  @ApiProperty({ description: '用户手机号', type: String, required: true })
  @IsMobilePhone('zh-CN')
  readonly mobile: string;

  @ApiProperty({ description: '用户短信验证码', type: String, required: true })
  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  readonly smscode: string;
}

export class CreateRolesDto {
  @ApiProperty({ description: '权限名称', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '权限登记', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  level: number;
}

export class UpdateRolesDto {
  @ApiProperty({ description: '权限名称', type: String, required: false })
  @ValidateIf((value) => value === undefined)
  @IsString()
  name?: string;

  @ApiProperty({ description: '权限登记', type: Number, required: false })
  @ValidateIf((value) => value === undefined)
  @IsPositive()
  @Transform((value) => Number(value))
  level?: number;
}

export class ValidateUserDto {
  @ApiProperty({ description: '唯一标示', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  identifier: string;
}

export class IdDto {
  @ApiProperty({ description: 'id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  id: number;
}

export class CreateAccessRolesDto {
  @ApiProperty({ description: 'id', type: [Number], required: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly accessId: number[];

  @ApiProperty({ description: 'id', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  readonly rolesId: number;
}

export class CreateAccessDto {
  @ApiProperty({ description: '资源名称', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '资源请求的方法', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({ description: '资源地址', type: String, required: true })
  @IsString()
  @IsNotEmpty()
  api: string;

  @ApiProperty({ description: 'level', type: Number, required: true })
  @IsPositive()
  @Transform((value) => Number(value))
  level: number;
}

export class UpdateAccessDto {
  @ApiProperty({ description: '资源名称', type: String, required: false })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: 'level', type: Number, required: false })
  @IsPositive()
  @Transform((value) => Number(value))
  level?: number;
}
