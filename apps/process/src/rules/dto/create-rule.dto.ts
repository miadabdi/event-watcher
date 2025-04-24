import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Operator } from '../models/rules.model';

export class CreateRuleDto {
  @IsEnum(Operator)
  operator: Operator;

  @IsNumber()
  @Type(() => Number)
  value: number;

  @IsString()
  @IsNotEmpty()
  eventName: string;
}
