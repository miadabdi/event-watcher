import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

Schema();
export abstract class AbstractDocument {
  _id: Types.ObjectId;
}
