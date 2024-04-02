import { Model } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from '../schema/queue.schema';
import { CreateQueueDto } from './dto/createQueueDto.dto';
import { GatewayService } from '../gateway/gateway.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class QueueService {
  constructor(
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
    @InjectModel(Queue.name)
    private readonly queueModel: Model<Queue>,
    private readonly gatewayService: GatewayService,
  ) {}

  private isExecuting: boolean = false;
  private addCount: number = 0;
  private finishCount: number = 0;

  private async getItemCount(): Promise<number> {
    return this.queueModel.countDocuments();
  }

  private createQueue(dto: CreateQueueDto) {
    const newQueue = new this.queueModel(dto);
    return newQueue.save();
  }

  private async deleteQueues(args: Queue[]) {
    const itemIds = args.map((i) => i['_id']);
    this.queueModel.deleteMany({ _id: { $in: itemIds } }).exec();
  }

  private async getQueue(size: number): Promise<Queue[]> {
    return this.queueModel.find().sort({ createdAt: 1 }).limit(size).exec();
  }

  public async addQueues(emailsList: string[]) {
    for await (const email of emailsList) {
      this.addCount += 1;
      await this.createQueue({ email });
    }

    if (!this.isExecuting) this.queueExecutor();
  }

  private async queueExecutor() {
    this.isExecuting = true;

    let queueChunk = await this.getQueue(10);
    let documentsCount = await this.getItemCount();
    let isEmtyDb = documentsCount === 0;

    while (!isEmtyDb) {
      console.log('-------get chunk------');
      await this.promiseHandler(queueChunk);
      console.log('--------delete chunk----');
      await this.deleteQueues(queueChunk);

      documentsCount = await this.getItemCount();
      isEmtyDb = documentsCount === 0;
      if (!isEmtyDb) queueChunk = await this.getQueue(10);
    }

    console.log('addCount: ', this.addCount);
    console.log('finishCount: ', this.finishCount);
    this.isExecuting = false;
  }

  private async promiseHandler(queue: Queue[]) {
    const getRandomTime = () => {
      return Math.floor(Math.random() * (100000 - 5000 + 1)) + 5000;
    };

    function* processGen(promises) {
      for (const promise of promises) {
        yield promise;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const promises = queue.map((q) => {
      const randomTime = getRandomTime();
      return new Promise((resolve) => {
        setTimeout(() => {
          const { email } = q;
          const isValid = emailRegex.test(email);
          resolve({ email, isValid, randomTime });
        }, randomTime);
      });
    });

    const generators = processGen(promises);

    for (const value of generators) {
      value.then((data) => {
        console.log(data);
        this.gatewayService.sendToClient(data);
        this.emailService.create(data);
        this.finishCount += 1;
      });
    }

    await Promise.all(promises);
  }
}
