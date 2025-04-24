import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AgentDto } from '../dtos';

function extractAgent(context: ExecutionContext): AgentDto {
  return context.switchToHttp().getRequest().user;
}

export const CurrentAgent = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => extractAgent(context),
);
