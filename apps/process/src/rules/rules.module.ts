import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { MatchesDocument, MatchesSchema } from '../events/models/matches.model';
import { RulesDocument, RulesSchema } from './models/rules.model';
import { RulesController } from './rules.controller';
import { RulesRepository } from './rules.repository';
import { RulesService } from './rules.service';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: RulesDocument.name,
        schema: RulesSchema,
      },
      { name: MatchesDocument.name, schema: MatchesSchema },
    ]),
  ],
  controllers: [RulesController],
  providers: [RulesService, RulesRepository],
  exports: [RulesService],
})
export class RulesModule {}
