import { IsMongoId } from 'class-validator';

export class GetAgentsByTriggerCountDto {
  @IsMongoId()
  ruleId: string;
}
