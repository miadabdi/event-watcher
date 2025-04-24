import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsRepository } from './clients.repository';
import { ClientsService } from './clients.service';
import { ClientsDocument, ClientsSchema } from './models/clients.model';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ClientsDocument.name,
        schema: ClientsSchema,
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository],
  exports: [ClientsService],
})
export class ClientsModule {}
