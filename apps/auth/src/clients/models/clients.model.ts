import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'clients' })
export class ClientsDocument extends AbstractDocument {
  @Prop({ unique: true })
  identifier: string;

  @Prop()
  password: string;
}

export const ClientsSchema = SchemaFactory.createForClass(ClientsDocument);
