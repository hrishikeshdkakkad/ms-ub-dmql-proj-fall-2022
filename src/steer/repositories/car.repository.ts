import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Car } from '../entities/car.entity';

@Injectable()
export class CarRepository extends Repository<Car> {
  constructor(private dataSource: DataSource) {
    super(Car, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Car> {
    const car = await this.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException();
    }

    return car;
  }
}
