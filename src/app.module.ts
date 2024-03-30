import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { QueueModule } from './queue/queue.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/emaildb'),
    QueueModule,
    GatewayModule,
  ],
  controllers: [AppController],
  exports: [],
})
export class AppModule {}
