import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Queue } from '../schema/queue.schema';
import { GatewayService } from '../gateway/gateway.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class PromiseHandler {
  constructor(
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
    private readonly gatewayService: GatewayService,
  ) {}

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private get getRandomTime() {
    return Math.floor(Math.random() * (100000 - 5000 + 1)) + 5000;
  }

  public async exec(queue: Queue[]) {
    function* processGen(promises) {
      for (const promise of promises) {
        yield promise;
      }
    }

    const promises = queue.map((q) => {
      const randomTime = this.getRandomTime;
      return new Promise((resolve) => {
        setTimeout(() => {
          const { email } = q;
          const isValid = this.emailRegex.test(email);
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
      });
    }

    await Promise.all(promises);
  }
}
