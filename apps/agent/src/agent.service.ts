import { PROCESS_SERVICE } from '@app/common';
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { AuthService } from './auth.service';
import { CPUUsage } from './utils/cpu';
import { MemoryUsage } from './utils/memory';

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

  @Cron('*/6 * * * * *', { disabled: true, name: 'event-emitter' })
  async sendData() {
    this.logger.log('Eventing');

    const data = await this.getData();

    const events = [
      {
        eventName: 'cpu-usage',
        value: data.cpuUsage,
      },
      {
        eventName: 'memory-usage',
        value: data.memoryUsage,
      },
    ];

    events.forEach((eventData) => {
      this.processClient.emit('event', {
        Authentication: this.jwt,
        ...eventData,
      });
    });
  }

  async getData(): Promise<{ cpuUsage: number; memoryUsage: number }> {
    const memoryUsage = MemoryUsage();

    const cpuUsage = await CPUUsage(1000);

    return {
      cpuUsage,
      memoryUsage,
    };
  }
}
