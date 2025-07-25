import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Team {
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
}
