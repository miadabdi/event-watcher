import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ versionKey: false, collection: 'events', timestamps: true })
export class EventsDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.String })
  agentId: string;

  @Prop({ type: SchemaTypes.Number })
  value: number;

  @Prop({ type: SchemaTypes.String })
  eventName: string;
}

export const EventsSchema = SchemaFactory.createForClass(EventsDocument);
