import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rideMeta')
export class RideMeta {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 300 })
  fromLat: string;

  @Column({ length: 300 })
  fromLng: string;

  @Column({ length: 300 })
  toLat: string;

  @Column({ length: 300 })
  toLng: string;

  @Column()
  distance: number;
}
