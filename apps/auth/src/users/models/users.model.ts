import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClientType } from '../types';

@Schema({ versionKey: false, collection: 'users' })
export class UsersDocument extends AbstractDocument {
  @Prop({ unique: true, required: false })
  email?: string;

  @Prop()
  password: string;

  @Prop({ type: Number, enum: ClientType })
  type: ClientType;
}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);
