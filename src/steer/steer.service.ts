import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CustomerCreateDto } from './dtos/customer-create.dto';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';

@Injectable()
export class SteerService {
  constructor(private repository: CustomerRepository) {}
  async createCustomer(input: CustomerCreateDto): Promise<any> {
    const customer = plainToClass(Customer, input);
    const savedCustomer = await this.repository.save(customer);
    return savedCustomer;
  }
}
