import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { EventsModule } from './events/events.module';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    LoggerModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: AUTH_SERVICE,
          useFactory: (configService: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
                queue: AUTH_SERVICE,
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
    EventsModule,
    RulesModule,
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
