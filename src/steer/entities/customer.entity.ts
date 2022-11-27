import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Ride } from './ride.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Unique('customerphonenumber', ['customerphonenumber'])
  @Column({ length: 100 })
  phonenumber: string;

  @Unique('customeremail', ['customeremail'])
  @Column({ length: 200 })
  email: string;

  @OneToMany(() => Ride, (ride) => ride.customerId)
  rides: Ride[];
}
