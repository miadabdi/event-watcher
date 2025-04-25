import { AgentDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HandleEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsNumber()
  @Type(() => Number)
  value: number;

  user: AgentDto;
}
