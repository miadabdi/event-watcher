import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Operator } from './models/rules.model';
import { RulesRepository } from './rules.repository';

@Injectable()
export class RulesService {
  constructor(private readonly rulesRepository: RulesRepository) {}

  async findMatchingRules(eventName: string, value: number) {
    // Fetching all the rules from the mongodb
    // where the rule matches the eventName and its value
    const rules = await this.rulesRepository.find({
      eventName: eventName,
      $expr: {
        $switch: {
          branches: [
            {
              case: { $eq: ['$operator', Operator.gt] },
              then: { $gt: [value, '$value'] },
            },
            {
              case: { $eq: ['$operator', Operator.lt] },
              then: { $lt: [value, '$value'] },
            },
            {
              case: { $eq: ['$operator', Operator.eq] },
              then: { $eq: [value, '$value'] },
            },
          ],
          default: false,
        },
      },
    });

    return rules;
  }

  create(createRuleDto: CreateRuleDto) {
    return this.rulesRepository.create(createRuleDto);
  }

  findAll() {
    return this.rulesRepository.find({});
  }

  findOne(_id: string) {
    return this.rulesRepository.findOne({ _id });
  }

  update(_id: string, updateRuleDto: UpdateRuleDto) {
    return this.rulesRepository.findOneAndUpdate({ _id }, updateRuleDto);
  }

  remove(_id: string) {
    return this.rulesRepository.findOneAndDelete({ _id });
  }
}
