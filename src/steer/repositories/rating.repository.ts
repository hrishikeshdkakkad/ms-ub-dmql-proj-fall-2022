import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Driver } from '../entities/driver.entity';
import { Payment } from '../entities/payment.entity';
import { Rating } from '../entities/rating.entity';
import { RideMeta } from '../entities/ride-meta.entity';

@Injectable()
export class RatingRepository extends Repository<Rating> {
  constructor(private dataSource: DataSource) {
    super(Rating, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Rating> {
    const rating = await this.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException();
    }

    return rating;
  }
}
