import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.getOrThrow<number>('JWT_EXPIRES')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES: Joi.number().required(),
        HTTP_PORT: Joi.number().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
})
export class AuthModule {}
