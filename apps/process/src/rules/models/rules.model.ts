import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

export enum Operator {
  gt = 'gt',
  lt = 'lt',
  eq = 'eq',
}

@Schema({ versionKey: false, collection: 'rules', timestamps: true })
export class RulesDocument extends AbstractDocument {
  @Prop({ type: String, enum: Operator })
  operator: Operator;

  @Prop({ type: SchemaTypes.Int32 })
  value: number;

  @Prop({ type: SchemaTypes.String })
  eventName: string;
}

export const RulesSchema = SchemaFactory.createForClass(RulesDocument);
