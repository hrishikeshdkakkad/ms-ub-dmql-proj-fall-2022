import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cartype')
export class CarType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  baseMultiplier: number;
}
