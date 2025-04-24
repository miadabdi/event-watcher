import { CurrentUser } from '@app/common';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ClientsDocument } from './clients/models/clients.model';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @CurrentUser() client: ClientsDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.login(client, response);
    return client;
  }

  @UseGuards(JWTAuthGuard)
  @MessagePattern('authenticate')
  authenticate(@Payload() data: { user: ClientsDocument }) {
    return data.user;
  }
}
