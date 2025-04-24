import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgentsDocument } from './models/agents.model';

@Injectable()
export class AgentsRepository extends AbstractRepository<AgentsDocument> {
  protected readonly logger = new Logger(AgentsRepository.name);

  constructor(
    @InjectModel(AgentsDocument.name)
    userModel: Model<AgentsDocument>,
  ) {
    super(userModel);
  }
}
