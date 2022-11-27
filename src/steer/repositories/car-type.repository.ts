import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';

@Injectable()
export class CarTypeRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Customer> {
    const article = await this.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
