import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pageMenu!: string;

  @Column()
  title!: string;

   @Column()
  pageAlise!: string;

  @Column()
  imageUrl!: string;
  
  @Column()
  shortContent!: string;

  @Column()
  Description!: string;
 
  @Column()
  metaTitle!: string;

  @Column()
  metaKeyword!: string;
 
  @Column()
  metaDescription!: string;

   @Column({ type: 'boolean', default: false })
  isPublish!: boolean;

}
