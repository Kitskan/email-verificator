import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueModule } from './queue/queue.module';
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/emaildb'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysqldb',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'email',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    QueueModule,
    EmailModule,
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
