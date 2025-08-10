import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  designation!: string;

  @Column()
  type!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ type: 'text', nullable: true })
  testimonial!: string;

  @Column({ type: 'text', nullable: true })
  skills!: string;

  @Column({ type: 'text', nullable: true })
  whatIDo!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  facebook!: string;

  @Column({ nullable: true })
  twitter!: string;

  @Column({ nullable: true })
  linkedin!: string;

  @Column({ nullable: true })
  instagram!: string;

  @Column({ nullable: true })
  youtube!: string;

  @Column({ default: false })
  isPublish!: boolean;

  @Column()
  order!: number;
}
