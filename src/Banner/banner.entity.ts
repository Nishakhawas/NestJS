import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'banners' })
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  bannerHeading: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ImageUrl: string; // store image filename or URL (upload logic is separate)

  @Column({ type: 'text' })
  bannerContents: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  buttonText1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  buttonUrl1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  buttonText2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  buttonUrl2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  order: string;

  @Column({ type: 'boolean', default: false })
  isPublish: boolean;

  @Column({ type: 'boolean', default: false })
  isUnlimited: boolean;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
