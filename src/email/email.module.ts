import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { QueueModule } from '../queue/queue.module';
import { EmailEntity } from './entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailEntity]), QueueModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
