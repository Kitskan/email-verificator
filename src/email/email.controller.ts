import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/add')
  public async add(@Body() body: { emailList: string[] }): Promise<void> {
    const { emailList } = body;
    await this.emailService.add(emailList);
  }
}
