import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchesDocument } from './models/matches.model';

@Injectable()
export class MatchesRepository extends AbstractRepository<MatchesDocument> {
  protected readonly logger = new Logger(MatchesRepository.name);

  constructor(
    @InjectModel(MatchesDocument.name)
    userModel: Model<MatchesDocument>,
  ) {
    super(userModel);
  }
}
