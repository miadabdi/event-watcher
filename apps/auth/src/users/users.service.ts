import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateAgentDto, CreateUserDto } from './dto';
import { ClientType } from './types';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    let user;

    try {
      user = await this.usersRepository.findOne({
        email: createUserDto.email,
      });
    } catch {
      //
    }

    if (user) {
      throw new BadRequestException('User already registered');
    }

    return this.usersRepository.create({
      email: createUserDto.email,
      password: await bcryptjs.hash(createUserDto.password, 10),
      type: ClientType.USER,
    });
  }

  async createAgent(createAgentDto: CreateAgentDto) {
    return this.usersRepository.create({
      password: await bcryptjs.hash(createAgentDto.password, 10),
      type: ClientType.AGENT,
    });
  }

  async verifyCredintials(password: string, hash: string) {
    const isMatch = await bcryptjs.compare(password, hash);

    if (!isMatch) {
      throw new UnauthorizedException('Credintials are incorrect');
    }
  }

  async verifyTypeUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    await this.verifyCredintials(password, user.password);

    return user;
  }

  async verifyTypeAgent(_id: string, password: string) {
    const user = await this.usersRepository.findOne({ _id });

    await this.verifyCredintials(password, user.password);

    return user;
  }

  async getUser(_id: string) {
    const user = await this.usersRepository.findOne({ _id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
