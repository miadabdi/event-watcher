import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../dtos';

function extractUser(context: ExecutionContext): UserDto {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => extractUser(context),
);
