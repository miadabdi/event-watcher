import { Injectable } from '@nestjs/common';
import { RulesService } from '../rules/rules.service';
import { HandleEventDto } from './dto/handle-event.dto';
import { EventsRepository } from './events.repository';
import { MatchesRepository } from './matches.repository';
import { MatchesDocument } from './models/matches.model';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly matchesRepository: MatchesRepository,
    private readonly rulesService: RulesService,
  ) {}

  async handleEvent(data: HandleEventDto) {
    await this.eventsRepository.create({
      agentId: data.user._id,
      eventName: data.eventName,
      value: data.value,
    });

    const matchingRules = await this.rulesService.findMatchingRules(
      data.eventName,
      data.value,
    );

    const matchDocs = matchingRules.map((rule) => {
      return {
        agentId: data.user._id,
        eventName: data.eventName,
        value: data.value,
        ruleId: rule._id,
      } as MatchesDocument;
    });
    await this.matchesRepository.createMany(matchDocs);
  }
}
