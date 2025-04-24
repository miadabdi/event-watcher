import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
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
    ]),
  ],
  controllers: [RulesController],
  providers: [RulesService, RulesRepository],
})
export class RulesModule {}
