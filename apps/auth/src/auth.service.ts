import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AgentsService } from './agents/agents.service';
import { AgentsDocument } from './agents/models/agents.model';
import { LoginMicroservicesDto } from './dto/login-microservices.dto';
import { IJWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private agentsService: AgentsService,
  ) {}

  generateToken(agent: AgentsDocument): string {
    const JWTPayload: IJWTPayload = {
      identifier: agent.identifier,
    };
    const token = this.jwtService.sign(JWTPayload);

    return token;
  }

  login(agent: AgentsDocument, response: Response) {
    const expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds() +
        this.configService.getOrThrow<number>('JWT_EXPIRES'),
    );

    const token = this.generateToken(agent);

    response.cookie('Authentication', token, {
      expires: expiresIn,
      httpOnly: true,
    });
  }

  async loginMicroservices(data: LoginMicroservicesDto) {
    const agent = await this.agentsService.verifyAgent(
      data.identifier,
      data.password,
    );
    if (!agent) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(agent);
  }
}
