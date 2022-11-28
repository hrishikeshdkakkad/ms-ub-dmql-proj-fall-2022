import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriverRepository extends Repository<Driver> {
  constructor(private dataSource: DataSource) {
    super(Driver, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Driver> {
    const driver = await this.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException();
    }

    return driver;
  }
}
