import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsStrongPassword()
  password: string;
}
