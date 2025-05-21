import { PROCESS_SERVICE } from '@app/common';
import { faker } from '@faker-js/faker';
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { AuthService } from './auth.service';

@Injectable()
export class AgentService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AgentService.name);
  private jwt: string;

  constructor(
    private readonly authService: AuthService,
    private schedulerRegistry: SchedulerRegistry,
    @Inject(PROCESS_SERVICE) private readonly processClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    // Auth this agent before any operation
    await this.authService.login();
    this.jwt = this.authService.getJwt();

    // enable event-emitter job
    this.logger.log('Enabling event-emitter job');
    const job = this.schedulerRegistry.getCronJob('event-emitter');
    job.start();
  }

  @Cron('0 * * * * *', { disabled: true, name: 'event-emitter' })
  sendData() {
    this.logger.log('Eventing');

    const randomData = this.genData();

    const events = [
      {
        eventName: 'cpu-temp',
        value: randomData.cpuTemp,
      },
      {
        eventName: 'cpu-voltage',
        value: randomData.cpuVoltage,
      },
      {
        eventName: 'cpu-util',
        value: randomData.cpuUtil,
      },
      {
        eventName: 'memory-usage',
        value: randomData.memoryUsage,
      },
    ];

    events.forEach((eventData) => {
      this.processClient.emit('event', {
        Authentication: this.jwt,
        ...eventData,
      });
    });
  }

  genData() {
    const cpuVoltage = faker.number.float({
      min: 0.9,
      max: 1.2,
      fractionDigits: 4,
    });

    const memoryUsage = faker.number.int({
      min: 500,
      max: 4096,
    });

    const cpuTemp = faker.number.int({
      min: 46,
      max: 90,
    });

    const cpuUtil = faker.number.float({
      min: 5,
      max: 100,
    });

    return {
      cpuTemp,
      cpuUtil,
      cpuVoltage,
      memoryUsage,
    };
  }
}
