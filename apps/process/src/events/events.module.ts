import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { RulesModule } from '../rules/rules.module';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';
import { MatchesRepository } from './matches.repository';
import { EventsDocument, EventsSchema } from './models/events.model';
import { MatchesDocument, MatchesSchema } from './models/matches.model';

@Module({
  imports: [
    RulesModule,
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
  providers: [EventsService, MatchesRepository, EventsRepository],
})
export class EventsModule {}
