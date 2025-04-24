import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientsDocument } from './models/clients.model';

@Injectable()
export class ClientsRepository extends AbstractRepository<ClientsDocument> {
  protected readonly logger = new Logger(ClientsRepository.name);

  constructor(
    @InjectModel(ClientsDocument.name)
    userModel: Model<ClientsDocument>,
  ) {
    super(userModel);
  }
}
