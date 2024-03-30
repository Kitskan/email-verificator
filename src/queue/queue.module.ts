import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Queue, QueueSchema } from '../schema/queue.schema';
import { QueueService } from './queue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
