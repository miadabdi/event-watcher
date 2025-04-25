import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-users.dto';
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
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credintials are incorrect');
    }

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
