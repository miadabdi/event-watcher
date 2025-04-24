import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { AgentsRepository } from './agents.repository';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(private agentsRepository: AgentsRepository) {}

  async createAgent(createAgentDto: CreateAgentDto) {
    const user = await this.agentsRepository.findOne({
      identifier: createAgentDto.identifier,
    });
    if (user) {
      throw new BadRequestException('Email already registered');
    }

    return this.agentsRepository.create({
      identifier: createAgentDto.identifier,
      password: await bcryptjs.hash(createAgentDto.password, 10),
    });
  }

  async verifyAgent(identifier: string, password: string) {
    const user = await this.agentsRepository.findOne({ identifier });

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credintials are incorrect');
    }

    return user;
  }

  async getAgent(_id: string) {
    const user = await this.agentsRepository.findOne({ _id });

    if (!user) {
      throw new NotFoundException('Agent not found');
    }

    return user;
  }
}
