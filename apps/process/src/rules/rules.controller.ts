import { JWTAuthGuard } from '@app/common';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { GetAgentsByTriggerCountDto } from './dto/get-agents-by-trigger-count.dto';
import { GetRuleTriggersDto } from './dto/get-rule-triggers.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RulesService } from './rules.service';

@UseGuards(JWTAuthGuard)
@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get('triggers')
  async getRuleTriggers(@Query() query: GetRuleTriggersDto) {
    const from = new Date(query.from);
    const to = new Date(query.to);
    if (to.getTime() - from.getTime() > 24 * 60 * 60 * 1000) {
      throw new BadRequestException('Time range cannot exceed 1 day');
    }

    return this.rulesService.getRuleTriggers(query.ruleId, from, to);
  }

  @Get('agents-by-trigger-count')
  async getAgentsByTriggerCount(@Query() query: GetAgentsByTriggerCountDto) {
    return this.rulesService.getAgentsByTriggerCount(query.ruleId);
  }

  @Post()
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.create(createRuleDto);
  }

  @Get()
  findAll() {
    return this.rulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.rulesService.update(id, updateRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesService.remove(id);
  }
}
