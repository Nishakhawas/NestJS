import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nepequengdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  bsdate: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  addate: string;
}