import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ClientsDocument } from './clients/models/clients.model';
import { IJWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  login(client: ClientsDocument, response: Response) {
    const JWTPayload: IJWTPayload = {
      _id: client._id.toHexString(),
    };

    const expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds() +
        this.configService.getOrThrow<number>('JWT_EXPIRES'),
    );

    const token = this.jwtService.sign(JWTPayload);

    response.cookie('Authentication', token, {
      expires: expiresIn,
      httpOnly: true,
    });
  }
}
