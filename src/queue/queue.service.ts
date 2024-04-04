import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from '../schema/queue.schema';
import { CreateQueueDto } from './dto/createQueueDto.dto';
import { PromiseHandler } from '../promise-handler/promise-handler';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name)
    private readonly queueModel: Model<Queue>,
    private readonly promiseHandler: PromiseHandler,
  ) {}

  private isExecuting: boolean = false;
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
      await this.promiseHandler.exec(queueChunk);
      console.log('--------delete chunk----');
      await this.deleteQueues(queueChunk);

      documentsCount = await this.getItemCount();
      isEmtyDb = documentsCount === 0;
      if (!isEmtyDb) queueChunk = await this.getQueue(10);
    }

    this.isExecuting = false;
  }
}
