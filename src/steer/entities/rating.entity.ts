import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ride } from './ride.entity';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Ride)
  @JoinColumn()
  ride: Ride;

  @Column()
  rating: number;

  @Column()
  comment: string;
}
