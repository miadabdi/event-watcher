import { AUTH_SERVICE } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, retry } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private jwt: string;

  getJwt(): string {
    return this.jwt;
  }

  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async login() {
    await this.authClient.connect();

    const identifier = this.configService.getOrThrow<string>('AGENT_ID');
    const password = this.configService.getOrThrow<string>('AGENT_PASSWORD');

    try {
      this.logger.log(`About to login using: identifier=${identifier}`);

      const jwt = await firstValueFrom(
        this.authClient
          .send('login', {
            identifier,
            password,
          })
          .pipe(
            retry({
              count: 2,
              delay: 100,
            }), // 1 original try + 2 retries = 3 attempts
          ),
      );

      this.logger.log('Logged in');
      this.jwt = jwt;
    } catch (err) {
      this.logger.error('Failed to Authenticate', err);
      throw new Error('Shutting down due to auth');
    }
  }
}
