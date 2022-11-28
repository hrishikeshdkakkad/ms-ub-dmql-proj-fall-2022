import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Driver } from '../entities/driver.entity';
import { RideMeta } from '../entities/ride-meta.entity';

@Injectable()
export class RideMetaRepository extends Repository<RideMeta> {
  constructor(private dataSource: DataSource) {
    super(RideMeta, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<RideMeta> {
    const rideMeta = await this.findOne({ where: { id } });
    if (!rideMeta) {
      throw new NotFoundException();
    }

    return rideMeta;
  }
}
