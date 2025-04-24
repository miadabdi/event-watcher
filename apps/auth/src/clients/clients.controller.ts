import { CurrentUser } from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsDocument } from './models/clients.model';

@Controller('users')
export class ClientsController {
  constructor(private usersService: ClientsService) {}

  @Post()
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.usersService.createClient(createClientDto);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  getMe(@CurrentUser() user: ClientsDocument) {
    return user;
  }
}
