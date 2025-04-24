import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../libs/common/src';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsDocument, EventsSchema } from './models/events.model';
import { MatchesDocument, MatchesSchema } from './models/matches.model';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: EventsDocument.name,
        schema: EventsSchema,
      },
      {
        name: MatchesDocument.name,
        schema: MatchesSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
