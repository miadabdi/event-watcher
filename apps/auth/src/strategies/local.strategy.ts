import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: ClientsService) {
    super({
      usernameField: 'identifier',
    });
  }

  async validate(identifier: string, password: string) {
    try {
      return await this.usersService.verifyClient(identifier, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
