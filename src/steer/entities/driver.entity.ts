import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Car } from './car.entity';
import { Ride } from './ride.entity';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 300 })
  address: string;

  @Unique('driverphonenumber', ['driverphonenumber'])
  @Column({ length: 100 })
  phonenumber: string;

  @OneToOne(() => Car)
  @JoinColumn()
  car: Car;

  @OneToMany(() => Ride, (ride) => ride.customerId)
  rides: Ride[];
}
