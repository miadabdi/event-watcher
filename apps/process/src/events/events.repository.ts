import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsDocument } from './models/events.model';

@Injectable()
export class EventsRepository extends AbstractRepository<EventsDocument> {
  protected readonly logger = new Logger(EventsRepository.name);

  constructor(
    @InjectModel(EventsDocument.name)
    userModel: Model<EventsDocument>,
  ) {
    super(userModel);
  }
}
