import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Driver } from '../entities/driver.entity';
import { Ride } from '../entities/ride.entity';
import { RideMeta } from '../entities/ride-meta.entity';

@Injectable()
export class RideRepository extends Repository<Ride> {
  constructor(private dataSource: DataSource) {
    super(Ride, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Ride> {
    const ride = await this.findOne({ where: { id } });
    if (!ride) {
      throw new NotFoundException();
    }

    return ride;
  }
}
