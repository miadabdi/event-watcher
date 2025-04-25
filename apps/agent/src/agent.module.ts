import { LoggerModule, PROCESS_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { AgentService } from './agent.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AGENT_ID: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: PROCESS_SERVICE,
          useFactory: (configService: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
                queue: PROCESS_SERVICE,
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [],
  providers: [AgentService],
})
export class AgentModule {}
