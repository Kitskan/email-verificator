import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue/queue.service';

@Controller()
export class AppController {
  constructor(private readonly queueService: QueueService) {}

  @Post('/add')
  public async add(@Body() body: { emailList: string[] }): Promise<void> {
    const { emailList } = body;
    await this.queueService.addQueues(emailList);
  }

}