import { Type } from 'class-transformer';
import { IsDate, IsMongoId } from 'class-validator';

export class GetRuleTriggersDto {
  @IsMongoId()
  ruleId: string;

  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsDate()
  @Type(() => Date)
  to: Date;
}
