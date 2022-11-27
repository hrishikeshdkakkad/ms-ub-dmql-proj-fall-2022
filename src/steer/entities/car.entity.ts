import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { CarType } from './car-type.entity';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Unique('licencenumber', ['licencenumber'])
  @Column({ length: 100 })
  licencenumber: string;

  @Column({ length: 200 })
  color: string;

  @OneToOne(() => CarType)
  @JoinColumn()
  cartype: CarType;
}
