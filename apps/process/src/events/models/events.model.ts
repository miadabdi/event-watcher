import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'events', timestamps: true })
export class EventsDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  agentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.Number })
  value: number;

  @Prop({ type: SchemaTypes.String, index: true })
  eventName: string;
}

export const EventsSchema = SchemaFactory.createForClass(EventsDocument);
