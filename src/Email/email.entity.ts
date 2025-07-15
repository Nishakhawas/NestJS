import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mailFrom!: string;

  @Column()
  mailAddress!: string;

  @Column()
  host!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  port!: number;

  @Column()
  protocol!: string; 

  @Column()
  Encryption!: string; 

  @Column({default: false })
  isActive!: boolean;
}
