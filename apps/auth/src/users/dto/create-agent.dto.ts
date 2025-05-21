import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
