import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';

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
  ) {}

  async createCustomer(input: CustomerCreateDto): Promise<any> {
    const customer = plainToClass(Customer, input);
    const savedCustomer = await this.customerRepository.save(customer);
    return savedCustomer;
  }

  async populate(input: PopulateDto) {
    const customer = plainToInstance(Customer, input.customer);
    console.log(customer);
    const savedCustomer = await this.customerRepository.save(customer);

    const car = plainToInstance(Car, input.car);
    console.log(car);
    const savedCar = await this.carRepository.save(car);

    const driver = plainToInstance(Driver, input.driver);
    console.log(driver);
    driver.car = savedCar;
    const savedDriver = await this.driverRepository.save(driver);

    const rideMeta = plainToInstance(RideMeta, input.rideMeta);
    console.log(rideMeta);
    const savedRideMeta = await this.rideMetaRepository.save(rideMeta);

    const ride = plainToInstance(Ride, input.ride);
    console.log(ride);
    ride.customerId = savedCustomer;
    ride.driver = savedDriver;
    ride.rideMeta = savedRideMeta;
    const savedRide = await this.rideRepository.save(ride);

    console.log(savedRide);
  }
}
