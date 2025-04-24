import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsStrongPassword()
  password: string;
}
