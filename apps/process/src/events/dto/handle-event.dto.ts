import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AgentsDocument } from '../../../../auth/src/agents/models/agents.model';

export class HandleEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsNumber()
  @Type(() => Number)
  value: number;

  user: AgentsDocument;
}
