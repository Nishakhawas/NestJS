import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ManageModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentMenu: string;

  @Column({ nullable: true })
  menu: string;

  @Column()
  displayText1: string;

  @Column({ nullable: true })
  displayText2: string;

  @Column()
  menuLink: string;

  @Column({ nullable: true })
  menuIconClass: string;

  // @Column({ nullable: true })
  // menuOrder: string;

  @Column({ nullable: true })
  menuOrder?: number;

@Column({ type: 'varchar', length: 10, nullable: true })
  postdatead: string;

@Column({ type: 'varchar', length: 10, nullable: true })
  postdatebs: string;

@UpdateDateColumn()
updatedAt: Date;

  @Column({ nullable: true })
  remarks: string;

  @Column({ default:false })
  isActive: boolean;
 
  // @Column() // Stores array like: "Insert,View,Update"
  // operations: string;
}
