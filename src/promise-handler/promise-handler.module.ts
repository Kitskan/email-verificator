import { Module, forwardRef } from '@nestjs/common';

import { PromiseHandler } from './promise-handler';
import { GatewayModule } from '../gateway/gateway.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [GatewayModule, forwardRef(() => EmailModule)],
  providers: [PromiseHandler],
  exports: [PromiseHandler],
})
export class PromiseHandlerModule {}
