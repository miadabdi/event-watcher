import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private usersRepository: ClientsRepository) {}

  async createClient(createClientDto: CreateClientDto) {
    const user = await this.usersRepository.findOne({
      identifier: createClientDto.identifier,
    });
    if (user) {
      throw new BadRequestException('Email already registered');
    }

    return this.usersRepository.create({
      identifier: createClientDto.identifier,
      password: await bcryptjs.hash(createClientDto.password, 10),
    });
  }

  async verifyClient(identifier: string, password: string) {
    const user = await this.usersRepository.findOne({ identifier });

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credintials are incorrect');
    }

    return user;
  }

  async getClient(_id: string) {
    const user = await this.usersRepository.findOne({ _id });

    if (!user) {
      throw new NotFoundException('Client not found');
    }

    return user;
  }
}
