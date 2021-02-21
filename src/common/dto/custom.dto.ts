import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsPositive,
  ValidateIf,
  IsInt,
} from 'class-validator';
