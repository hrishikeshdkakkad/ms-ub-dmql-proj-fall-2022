import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Connection } from 'typeorm';

import { CustomerCreateDto } from './dtos/customer-create.dto';
import { PopulateDto } from './dtos/populate.dto';
import { Car } from './entities/car.entity';
import { Customer } from './entities/customer.entity';
import { Driver } from './entities/driver.entity';
import { Ride } from './entities/ride.entity';
import { RideMeta } from './entities/ride-meta.entity';
import { CarRepository } from './repositories/car.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { DriverRepository } from './repositories/driver.repository';
import { RideRepository } from './repositories/ride.repository';
import { RideMetaRepository } from './repositories/ride-meta.repository';

@Injectable()
export class SteerService {
  constructor(
    private customerRepository: CustomerRepository,
    private carRepository: CarRepository,
    private driverRepository: DriverRepository,
    private rideMetaRepository: RideMetaRepository,
    private rideRepository: RideRepository,
    private connection: Connection,
  ) {}

  async createCustomer(input: CustomerCreateDto): Promise<any> {
    const customer = plainToClass(Customer, input);
    const savedCustomer = await this.customerRepository.save(customer);
    return savedCustomer;
  }

  async populate(input: PopulateDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customer = plainToInstance(Customer, input.customer);
      const savedCustomer = await queryRunner.manager.save(customer);

      const car = plainToInstance(Car, input.car);
      const savedCar = await queryRunner.manager.save(car);

      const driver = plainToInstance(Driver, input.driver);
      driver.car = savedCar;
      const savedDriver = await queryRunner.manager.save(driver);

      const rideMeta = plainToInstance(RideMeta, input.rideMeta);
      const savedRideMeta = await queryRunner.manager.save(rideMeta);

      const ride = plainToInstance(Ride, input.ride);
      ride.customerId = savedCustomer;
      ride.driver = savedDriver;
      ride.rideMeta = savedRideMeta;
      const savedRide = await queryRunner.manager.save(ride);

      await queryRunner.commitTransaction();
      return savedRide;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const error: any = {
        status: false,
        error: err.message,
      };
      return error;
    } finally {
      await queryRunner.release();
    }
  }
}
