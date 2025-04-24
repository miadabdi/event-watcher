import { JWTAuthGuard } from '@app/common';
import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleEventDto } from './dto/handle-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JWTAuthGuard)
  @EventPattern('event')
  handleEvent(@Payload() data: HandleEventDto) {
    return this.eventsService.handleEvent(data);
  }
}
