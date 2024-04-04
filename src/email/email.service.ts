import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { EmailEntity } from './entities/email.entity';

@Injectable()
export class EmailService {
  constructor(
    private readonly queueService: QueueService,
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>,
  ) {}

  public async add(emailList: string[]) {
    await this.queueService.addQueues(emailList);
  }

  public async create(email: EmailEntity[]): Promise<EmailEntity[]> {
    const newEmail = this.emailRepository.create(email);
    return this.emailRepository.save(newEmail);
  }
}
