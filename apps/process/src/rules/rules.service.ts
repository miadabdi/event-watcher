import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MatchesDocument } from '../events/models/matches.model';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Operator } from './enums/operator.enum';
import { RulesRepository } from './rules.repository';

@Injectable()
export class RulesService {
  constructor(
    private readonly rulesRepository: RulesRepository,
    @InjectModel(MatchesDocument.name)
    private readonly matchesModel: Model<MatchesDocument>,
  ) {}

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

  async getRuleTriggers(ruleId: string, from: Date, to: Date) {
    return this.matchesModel
      .aggregate([
        {
          $match: {
            ruleId: new Types.ObjectId(ruleId),
            createdAt: { $gte: from, $lte: to },
          },
        },
        {
          $group: {
            _id: '$agentId',
            timestamps: { $push: '$createdAt' },
          },
        },
        {
          $project: {
            agentId: '$_id',
            timestamps: 1,
            _id: 0,
          },
        },
      ])
      .exec();
  }

  async getAgentsByTriggerCount(ruleId: string) {
    return this.matchesModel
      .aggregate([
        { $match: { ruleId: new Types.ObjectId(ruleId) } },
        { $group: { _id: '$agentId', triggerCount: { $sum: 1 } } },
        { $sort: { triggerCount: -1 } },
        { $project: { agentId: '$_id', triggerCount: 1, _id: 0 } },
      ])
      .exec();
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
