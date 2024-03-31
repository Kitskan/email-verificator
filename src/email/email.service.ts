import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { EmailEntity } from './entities/email.entity';

@Injectable()
export class EmailService {
  constructor(
    @Inject(forwardRef(() => QueueService))
    private readonly queueService: QueueService,
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>,
  ) {}

  public async add(emailList: string[]) {
    await this.queueService.addQueues(emailList);
  }

  async create(email: EmailEntity[]): Promise<EmailEntity[]> {
    const newEmail = this.emailRepository.create(email);
    return this.emailRepository.save(newEmail);
  }
}
