import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AgentsService } from '../agents/agents.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: AgentsService) {
    super({
      usernameField: 'identifier',
    });
  }

  async validate(identifier: string, password: string) {
    try {
      return await this.usersService.verifyAgent(identifier, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
