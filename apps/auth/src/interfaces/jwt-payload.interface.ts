import { ClientType } from '../users/types';

export interface IJWTPayload {
  _id: string;
  type: ClientType;
}
