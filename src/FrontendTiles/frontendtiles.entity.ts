import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FrontendTile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  order: number;
  
  @Column({ type: 'boolean', default: false })
  isPublish: boolean;

}
