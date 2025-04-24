import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from '../dtos';

function extractUser(context: ExecutionContext): UserDto {
  return context.switchToHttp().getRequest<Request>().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => extractUser(context),
);
