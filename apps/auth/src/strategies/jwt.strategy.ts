import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          (request?.cookies?.Authentication as string) ||
          (request?.Authentication as string),
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate({ _id }: IJWTPayload) {
    return this.usersService.getUser(_id);
  }
}
