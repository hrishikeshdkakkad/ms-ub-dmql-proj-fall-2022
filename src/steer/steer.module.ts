import { Module } from '@nestjs/common';

import { CustomerRepository } from './repositories/customer.repository';
import { SteerController } from './steer.controller';
import { SteerService } from './steer.service';

@Module({
  controllers: [SteerController],
  providers: [SteerService, CustomerRepository],
})
export class SteerModule {}
