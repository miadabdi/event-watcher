import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Operator } from '../enums/operator.enum';

@Schema({ versionKey: false, collection: 'rules', timestamps: true })
export class RulesDocument extends AbstractDocument {
  @Prop({ type: String, enum: Operator })
  operator: Operator;

  @Prop({ type: SchemaTypes.Number })
  value: number;

  @Prop({ type: SchemaTypes.String, index: true })
  eventName: string;
}

export const RulesSchema = SchemaFactory.createForClass(RulesDocument);
