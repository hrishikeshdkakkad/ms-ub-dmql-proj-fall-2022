import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ride } from './ride.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Ride)
  @JoinColumn()
  ride: Ride;

  @Column()
  mode: string;

  @Column()
  amount: number;
}
