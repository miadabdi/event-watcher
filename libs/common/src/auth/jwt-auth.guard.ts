import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authclient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reqType = context.getType();
    let data: any;
    let jwt: string | null = null;
    if (reqType === 'rpc') {
      data = context.switchToRpc().getData();
      jwt = data.Authentication;
    } else if (reqType === 'http') {
      data = context.switchToHttp().getRequest<Request>();
      jwt = data.cookies?.Authentication;
    }

    if (!jwt) {
      return false;
    }

    return this.authclient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          data.user = res;
        }),
        map(() => true),
      );
  }
}
