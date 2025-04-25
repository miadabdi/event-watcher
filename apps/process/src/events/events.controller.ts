import { JWTAuthGuard } from '@app/common';
import { Controller, Logger, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleEventDto } from './dto/handle-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JWTAuthGuard)
  @EventPattern('event')
  handleEvent(@Payload() data: HandleEventDto) {
    this.logger.debug(`Event rec: ${data.eventName}`);

    return this.eventsService.handleEvent(data);
  }
}
