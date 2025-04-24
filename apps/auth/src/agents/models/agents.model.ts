import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'agents' })
export class AgentsDocument extends AbstractDocument {
  @Prop({ unique: true })
  identifier: string;

  @Prop()
  password: string;
}

export const AgentsSchema = SchemaFactory.createForClass(AgentsDocument);
