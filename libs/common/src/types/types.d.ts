import { AgentDto } from '../dtos';

declare namespace Express {
  export interface Request {
    user: AgentDto;
    cookies: object;
  }
  export interface Response {
    user: AgentDto;
  }
}
