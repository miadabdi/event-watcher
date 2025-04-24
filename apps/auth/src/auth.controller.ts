import { CurrentUser } from '@app/common';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AgentsDocument } from './agents/models/agents.model';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @CurrentUser() agent: AgentsDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.login(agent, response);
    return agent;
  }

  @UseGuards(JWTAuthGuard)
  @MessagePattern('authenticate')
  authenticate(@Payload() data: { user: AgentsDocument }) {
    return data.user;
  }
}
