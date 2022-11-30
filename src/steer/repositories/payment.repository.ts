import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Driver } from '../entities/driver.entity';
import { Payment } from '../entities/payment.entity';
import { RideMeta } from '../entities/ride-meta.entity';

@Injectable()
export class PaymentRepository extends Repository<Payment> {
  constructor(private dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Payment> {
    const payment = await this.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException();
    }

    return payment;
  }
}
