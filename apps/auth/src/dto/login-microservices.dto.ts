import { IsNotEmpty, IsString } from 'class-validator';

export class LoginMicroservicesDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
