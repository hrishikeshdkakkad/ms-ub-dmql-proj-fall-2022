import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Customer } from './customer.entity';
import { Driver } from './driver.entity';
import { RideMeta } from './ride-meta.entity';

@Entity('ride')
export class Ride {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.rides)
  customerId: Customer;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  driver: Driver;

  @CreateDateColumn()
  startTimestamp: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTimestamp: Date;

  @OneToOne(() => RideMeta)
  @JoinColumn()
  rideMeta: RideMeta;
}
