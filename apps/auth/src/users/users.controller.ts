import { CurrentUser } from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersDocument } from './models/users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private agentsService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.agentsService.createUser(createUserDto);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  getMe(@CurrentUser() agent: UsersDocument) {
    return agent;
  }
}
