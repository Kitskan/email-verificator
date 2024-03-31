import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Queue, QueueSchema } from '../schema/queue.schema';
import { QueueService } from './queue.service';
import { GatewayModule } from '../gateway/gateway.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
    GatewayModule,
    forwardRef(() => EmailModule),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
