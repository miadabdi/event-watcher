import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginMicroservicesDto } from './dto/login-microservices.dto';
import { IJWTPayload } from './interfaces/jwt-payload.interface';
import { UsersDocument } from './users/models/users.model';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  generateToken(user: UsersDocument): string {
    const JWTPayload: IJWTPayload = {
      _id: user._id.toHexString(),
    };
    const token = this.jwtService.sign(JWTPayload);

    return token;
  }

  login(user: UsersDocument, response: Response) {
    const expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds() +
        this.configService.getOrThrow<number>('JWT_EXPIRES'),
    );

    const token = this.generateToken(user);

    response.cookie('Authentication', token, {
      expires: expiresIn,
      httpOnly: true,
    });
  }

  async loginMicroservices(data: LoginMicroservicesDto) {
    const user = await this.usersService.verifyUser(
      data.identifier,
      data.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }
}
