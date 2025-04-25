import { PROCESS_SERVICE } from '@app/common';
import { faker } from '@faker-js/faker';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);
  private jwt: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(PROCESS_SERVICE) private readonly processClient: ClientProxy,
  ) {}

  @Cron('* * * * * *', { name: 'event-emitter' })
  sendData() {
    this.logger.log('Eventing');

    const randomData = this.genData();

    const agentId = this.configService.getOrThrow<string>('AGENT_ID');

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
        ...eventData,
        agentId: agentId,
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
