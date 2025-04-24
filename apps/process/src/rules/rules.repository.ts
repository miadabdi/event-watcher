import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RulesDocument } from './models/rules.model';

@Injectable()
export class RulesRepository extends AbstractRepository<RulesDocument> {
  protected readonly logger = new Logger(RulesRepository.name);

  constructor(
    @InjectModel(RulesDocument.name)
    userModel: Model<RulesDocument>,
  ) {
    super(userModel);
  }
}
