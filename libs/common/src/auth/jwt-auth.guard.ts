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
    const jwt = context.switchToHttp().getRequest<Request>()
      .cookies?.Authentication;

    if (!jwt) {
      return false;
    }

    return this.authclient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest<Request>().user = res;
        }),
        map(() => true),
      );
  }
}
