import { CurrentUser } from '@app/common';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginMicroservicesDto } from './dto/login-microservices.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersDocument } from './users/models/users.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @CurrentUser() user: UsersDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('reach');
    this.authService.login(user, response);
    return user;
  }

  @MessagePattern('login')
  loginMicroservices(@Payload() data: LoginMicroservicesDto) {
    return this.authService.loginMicroservices(data);
  }

  @UseGuards(JWTAuthGuard)
  @MessagePattern('authenticate')
  authenticate(@Payload() data: { user: UsersDocument }) {
    return data.user;
  }
}
