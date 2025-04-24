import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'matches', timestamps: true })
export class MatchesDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  agentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.Int32 })
  value: number;

  @Prop({ type: SchemaTypes.String })
  eventName: string;

  @Prop({ type: SchemaTypes.ObjectId })
  ruleId: Types.ObjectId;
}

export const MatchesSchema = SchemaFactory.createForClass(MatchesDocument);
