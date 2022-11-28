import { Module } from '@nestjs/common';

import { CarRepository } from './repositories/car.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { DriverRepository } from './repositories/driver.repository';
import { RideRepository } from './repositories/ride.repository';
import { RideMetaRepository } from './repositories/ride-meta.repository';
import { SteerController } from './steer.controller';
import { SteerService } from './steer.service';

@Module({
  controllers: [SteerController],
  providers: [
    SteerService,
    CustomerRepository,
    CustomerRepository,
    CarRepository,
    RideMetaRepository,
    RideRepository,
    DriverRepository,
  ],
})
export class SteerModule {}
