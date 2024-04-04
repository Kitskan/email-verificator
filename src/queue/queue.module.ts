import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Queue, QueueSchema } from '../schema/queue.schema';
import { QueueService } from './queue.service';
import { PromiseHandlerModule } from '../promise-handler/promise-handler.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
    PromiseHandlerModule,
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
