import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Queue {
  @Prop({
    type: String,
    require: true,
    unique: false,
  })
  email: string;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
