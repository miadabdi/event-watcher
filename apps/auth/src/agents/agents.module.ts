import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsRepository } from './agents.repository';
import { AgentsService } from './agents.service';
import { AgentsDocument, AgentsSchema } from './models/agents.model';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: AgentsDocument.name,
        schema: AgentsSchema,
      },
    ]),
  ],
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository],
  exports: [AgentsService],
})
export class AgentsModule {}
