import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'matches', timestamps: true })
export class MatchesDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  agentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.Number })
  value: number;

  @Prop({ type: SchemaTypes.String, index: true })
  eventName: string;

  @Prop({ type: SchemaTypes.ObjectId, index: true })
  ruleId: Types.ObjectId;
}

export const MatchesSchema = SchemaFactory.createForClass(MatchesDocument);
