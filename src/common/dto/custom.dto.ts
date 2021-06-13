import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsPositive,
} from 'class-validator';

export class DataBaseId {
  @ApiProperty({ description: '数据库索引id', type: String, required: true })
  @IsPositive()
  @Transform(({ value, key, obj, type }) => {
    console.log('xxxxx DataBaseId', { value, key, obj, type });
    return parseInt(value);
  })
  readonly id: number;
}

/**
 * 是否正确的id
 */
@ValidatorConstraint({ name: 'IsExactnessTagId', async: false })
export class IsExactnessTagId implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: number[], _args: ValidationArguments) {
    console.log(
      'value :>> ',
      value,
      value.some((e) => e < 0),
    );

    return value.some((e) => e < 0);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '参数校验失败!';
  }
}
